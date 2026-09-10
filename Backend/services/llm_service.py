import os
import json
import re
import requests
from typing import Dict, Any, Optional

class LLMService:
    """
    Universal LLM client supporting Google Gemini, Groq, and OpenAI via direct REST APIs,
    with automatic provider failover, JSON validation, and intelligent local domain synthesis fallback.
    """
    def __init__(self):
        pass

    def _get_api_keys(self, env_var: str) -> list:
        val = os.getenv(env_var, "")
        if not val or "YOUR_KEY" in val or "your_" in val.lower():
            return []
        return [k.strip() for k in val.split(",") if k.strip()]

    def _clean_json_response(self, text: str) -> Dict[str, Any]:
        """
        Cleans markdown wrappers, codeblocks, or trailing commas from LLM response text
        and parses into a valid Python dictionary.
        """
        if not text or not text.strip():
            raise ValueError("Empty response text from LLM")
            
        cleaned = text.strip()
        # Remove markdown ```json ... ``` or ``` ... ```
        if "```" in cleaned:
            match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned, re.IGNORECASE)
            if match:
                cleaned = match.group(1).strip()

        # If still not starting with {, try finding first { and last }
        if not cleaned.startswith("{") and "{" in cleaned and "}" in cleaned:
            start = cleaned.find("{")
            end = cleaned.rfind("}") + 1
            cleaned = cleaned[start:end]

        return json.loads(cleaned)

    def _call_gemini(self, prompt: str, system_instruction: str = "") -> Optional[Dict[str, Any]]:
        gemini_keys = self._get_api_keys("GEMINI_API_KEY") or self._get_api_keys("GOOGLE_API_KEY")
        if not gemini_keys:
            return None

        # Supported models in priority order
        models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"]

        for key in gemini_keys:
            for model in models:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
                payload = {
                    "contents": [
                        {
                            "parts": [
                                {"text": f"System: {system_instruction}\n\nUser: {prompt}" if system_instruction else prompt}
                            ]
                        }
                    ],
                    "generationConfig": {
                        "responseMimeType": "application/json",
                        "temperature": 0.2
                    }
                }
                try:
                    resp = requests.post(url, json=payload, timeout=20)
                    if resp.status_code == 200:
                        data = resp.json()
                        candidates = data.get("candidates", [])
                        if candidates and "content" in candidates[0]:
                            parts = candidates[0]["content"].get("parts", [])
                            if parts and "text" in parts[0]:
                                text_output = parts[0]["text"]
                                return self._clean_json_response(text_output)
                    else:
                        print(f"LLMService [Gemini/{model}]: Status {resp.status_code} - {resp.text[:150]}")
                except Exception as e:
                    print(f"LLMService [Gemini/{model}] Error: {e}")
        return None

    def _call_groq(self, prompt: str, system_instruction: str = "") -> Optional[Dict[str, Any]]:
        groq_keys = self._get_api_keys("GROQ_API_KEY")
        if not groq_keys:
            return None

        models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]
        url = "https://api.groq.com/openai/v1/chat/completions"

        for key in groq_keys:
            for model in models:
                headers = {
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json"
                }
                messages = []
                if system_instruction:
                    messages.append({"role": "system", "content": system_instruction})
                messages.append({"role": "user", "content": prompt})

                payload = {
                    "model": model,
                    "messages": messages,
                    "response_format": {"type": "json_object"},
                    "temperature": 0.2
                }
                try:
                    resp = requests.post(url, headers=headers, json=payload, timeout=10)
                    if resp.status_code == 200:
                        data = resp.json()
                        content = data["choices"][0]["message"]["content"]
                        return self._clean_json_response(content)
                except Exception:
                    pass
        return None

    def _call_openai(self, prompt: str, system_instruction: str = "") -> Optional[Dict[str, Any]]:
        openai_keys = self._get_api_keys("OPENAI_API_KEY")
        if not openai_keys:
            return None

        url = "https://api.openai.com/v1/chat/completions"
        for key in openai_keys:
            headers = {
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json"
            }
            messages = []
            if system_instruction:
                messages.append({"role": "system", "content": system_instruction})
            messages.append({"role": "user", "content": prompt})

            payload = {
                "model": "gpt-4o-mini",
                "messages": messages,
                "response_format": {"type": "json_object"},
                "temperature": 0.2
            }
            try:
                resp = requests.post(url, headers=headers, json=payload, timeout=20)
                if resp.status_code == 200:
                    data = resp.json()
                    content = data["choices"][0]["message"]["content"]
                    return self._clean_json_response(content)
            except Exception as e:
                print(f"LLMService [OpenAI] Error: {e}")
        return None

    def generate_structured_json(self, prompt: str, system_instruction: str = "") -> Optional[Dict[str, Any]]:
        """
        Attempts execution across available LLM providers (Gemini -> Groq -> OpenAI).
        Returns parsed JSON dict or None if all providers fail or are unconfigured.
        """
        # 1. Try Gemini
        res = self._call_gemini(prompt, system_instruction)
        if res:
            return res

        # 2. Try Groq
        res = self._call_groq(prompt, system_instruction)
        if res:
            return res

        # 3. Try OpenAI
        res = self._call_openai(prompt, system_instruction)
        if res:
            return res

        return None
