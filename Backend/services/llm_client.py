"""
Thin shared wrapper around the Groq client.

Centralizing this keeps every LLM call in the app going through one place
-- `call_llm_json` -- so swapping providers again later only means editing
this one file, not every agent/service.

Uses Groq's free tier (OpenAI-compatible chat completions API, extremely
fast inference on Llama/GPT-OSS models).
"""

import os
import json
import logging
from typing import Optional

from groq import Groq

logger = logging.getLogger("llm_client")

# openai/gpt-oss-120b is Groq's current recommended general-purpose model
# (Llama-3.3-70b-versatile was deprecated). Override with GROQ_MODEL in
# .env if you want to try a different hosted model, e.g. openai/gpt-oss-20b
# for an even faster/lighter option.
DEFAULT_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

_client: Optional[Groq] = None


def get_client() -> Groq:
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError(
                "GROQ_API_KEY is not set. Add it to Backend/.env to enable "
                "the Market and Competitor analysis agents. Get a free key "
                "at https://console.groq.com/keys"
            )
        _client = Groq(api_key=api_key)
    return _client


def _request_and_parse(system_prompt: str, user_prompt: str, max_tokens: int) -> dict:
    client = get_client()

    response = client.chat.completions.create(
        model=DEFAULT_MODEL,
        max_tokens=max_tokens,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )

    raw_text = (response.choices[0].message.content or "").strip()

    # Defensive cleanup in case the model wraps JSON in a markdown fence
    # despite being told not to.
    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`")
        if raw_text.lower().startswith("json"):
            raw_text = raw_text[4:]
        raw_text = raw_text.strip()

    return json.loads(raw_text), raw_text


def call_llm_json(system_prompt: str, user_prompt: str, max_tokens: int = 4096) -> dict:
    """
    Calls Groq with a system + user prompt that requests raw JSON back,
    and parses the response. Raises on failure so callers can decide how
    to degrade gracefully (see agents/*.py error handling).

    If the response comes back truncated (an "Unterminated string" style
    JSONDecodeError -- the model ran out of tokens mid-response), retries
    once with double the token budget before giving up.
    """
    try:
        data, _ = _request_and_parse(system_prompt, user_prompt, max_tokens)
        return data
    except json.JSONDecodeError as exc:
        logger.warning(
            "[LLM] First attempt returned truncated/invalid JSON (%s). Retrying with max_tokens=%d.",
            exc, max_tokens * 2,
        )
        try:
            data, _ = _request_and_parse(system_prompt, user_prompt, max_tokens * 2)
            return data
        except json.JSONDecodeError as retry_exc:
            logger.error("[LLM] Retry also failed to parse JSON: %s", retry_exc)
            raise ValueError(f"Groq returned non-JSON output after retry: {retry_exc}") from retry_exc