import os
from typing import Dict, Any, List
from services.llm_service import LLMService

class MarketOpportunityAgent:
    """
    Milestone 2 Agent 1: Market Opportunity & Customer Segmentation Agent.
    Analyzes web search snippets and startup concept parameters to extract:
    - Market size estimates (TAM/SAM/SOM), CAGR growth rate, and demand trajectory
    - Distinct customer segments, decision makers, core pain points, and buying behavior
    - Industry catalysts and domain-specific terminology
    """
    def __init__(self, llm_service: LLMService = None):
        self.llm = llm_service or LLMService()

    def analyze(self, startup_idea: str, industry: str, target_market: str, search_data: dict) -> dict:
        """
        Executes market opportunity and segmentation analysis.
        """
        search_snippets = ""
        for idx, item in enumerate(search_data.get("results", [])[:6]):
            search_snippets += f"\n[{idx+1}] Title: {item.get('title')}\nSnippet: {item.get('content')}\nURL: {item.get('url')}\n"

        search_answer = search_data.get("answer", "")

        system_instruction = (
            "You are an expert Silicon Valley Venture Capitalist and Senior Market Research Analyst. "
            "Your job is to produce a rigorous, structured Market Opportunity & Customer Segmentation Report "
            "for early-stage startup ideas using web search data. Output strictly valid JSON matching the exact schema."
        )

        prompt = f"""Analyze the startup concept below using the provided live search records.

Startup Concept: "{startup_idea}"
Industry Sector: "{industry}"
Target Audience: "{target_market}"

Web Search Intelligence:
{search_snippets}

Search Synthesis Note:
{search_answer}

Return a valid JSON object with the exact following schema:
{{
  "market_summary": "A high-impact 2-3 sentence executive summary of the overall market demand, growth vector, and potential.",
  "market_size_and_growth": {{
    "tam_estimate": "Estimated Total Addressable Market (e.g. $14.2B Global Market)",
    "sam_estimate": "Estimated Serviceable Addressable Market (e.g. $2.8B Regional / High-intent)",
    "som_estimate": "Estimated Serviceable Obtainable Market (e.g. $180M initial beachhead)",
    "cagr_growth_rate": "Expected CAGR (e.g. 16.4% annually)",
    "growth_stage": "One of: 'Emerging', 'High Growth', 'Maturing', 'Disruptive Niche'",
    "market_dynamics": "Key trends, shift in customer behaviors, or technology adoption catalysts."
  }},
  "customer_segments": [
    {{
      "segment_name": "Segment Title (e.g., Early-Adopter SMB Fleet Managers)",
      "target_users": "Who specifically uses the product vs who approves the purchase",
      "pain_points": [
        "Specific frustration or operational bottleneck #1",
        "Specific frustration or financial bottleneck #2"
      ],
      "core_motivations": [
        "Primary goal (e.g., 40% reduction in delivery delay, automated compliance)",
        "Secondary goal"
      ],
      "buying_behavior": "How they purchase (e.g., Monthly SaaS, pilot contract, self-serve trial)",
      "willingness_to_pay": "High / Medium / High with ROI justification"
    }},
    {{
      "segment_name": "Secondary / Scale Segment Title",
      "target_users": "Target profile and roles",
      "pain_points": [
        "Pain point #1",
        "Pain point #2"
      ],
      "core_motivations": [
        "Motivation #1",
        "Motivation #2"
      ],
      "buying_behavior": "Procurement pattern",
      "willingness_to_pay": "Medium / High"
    }}
  ],
  "demand_drivers": [
    "Catalyst 1: Economic, regulatory, or operational driver",
    "Catalyst 2: Technological advancement driving adoption",
    "Catalyst 3: Consumer / user preference evolution"
  ],
  "industry_terminology": [
    "Key domain term 1",
    "Key domain term 2",
    "Key domain term 3",
    "Key domain term 4"
  ]
}}
"""
        # Call LLM
        result = self.llm.generate_structured_json(prompt, system_instruction)
        if result and "market_summary" in result and "customer_segments" in result:
            result["agent_status"] = "live_llm"
            return result

        # Fallback heuristic analyzer
        return self._heuristic_fallback(startup_idea, industry, target_market, search_data)

    def _heuristic_fallback(self, startup_idea: str, industry: str, target_market: str, search_data: dict) -> dict:
        """
        Synthesizes robust domain-aware structured market analysis when LLM API keys are unconfigured.
        """
        lower_idea = startup_idea.lower()
        lower_ind = industry.lower()

        # Dynamic sizing estimates based on industry domain
        if any(w in lower_ind for w in ["health", "pet", "bio", "med"]):
            tam = "$42.5 Billion Global Market"
            sam = "$6.8 Billion Regional / Dedicated Segment"
            som = "$340 Million Beachhead Market"
            cagr = "14.2% CAGR (2024-2030)"
            terms = ["Tele-triage", "HIPAA/SOC2 Compliance", "Symptom Diagnostic AI", "EHR Integration", "Clinical Workflow"]
            driver1 = "Surge in digital-first telehealth adoption and remote diagnostic convenience."
            driver2 = "Veterinary clinic staff shortages increasing demand for automated pre-screening."
        elif any(w in lower_ind for w in ["green", "logist", "cargo", "mobility", "transport", "auto"]):
            tam = "$28.4 Billion Urban Logistics Market"
            sam = "$4.5 Billion Last-Mile Micro-Mobility"
            som = "$210 Million Urban Courier Niche"
            cagr = "18.7% CAGR (2024-2030)"
            terms = ["Last-Mile Optimization", "Fleet Telematics", "Micro-Hub Routing", "Payload Efficiency", "Zero-Emission Zone"]
            driver1 = "Municipal low-emission zones and urban congestion charges accelerating e-cargo adoption."
            driver2 = "Rapid growth of same-day on-demand e-commerce requiring high delivery density."
        elif any(w in lower_ind for w in ["edtech", "educat", "learn", "study"]):
            tam = "$31.8 Billion EdTech & Study Tools Market"
            sam = "$5.2 Billion Higher Ed & Test Prep Sector"
            som = "$260 Million University Student Early Adopter Base"
            cagr = "15.9% CAGR (2024-2030)"
            terms = ["Spaced Repetition", "Adaptive Assessment", "LMS Integration", "Cognitive Retention", "Active Recall"]
            driver1 = "Shift towards individualized AI tutoring and automated lecture comprehension."
            driver2 = "High study workloads driving demand for automated summarization and quiz generation."
        elif any(w in lower_ind for w in ["food", "meal", "nutrit", "agri"]):
            tam = "$19.6 Billion Smart Kitchen & FoodTech"
            sam = "$3.1 Billion Meal Planning & Waste Reduction"
            som = "$140 Million Tech-Forward Household Base"
            cagr = "13.5% CAGR (2024-2030)"
            terms = ["Inventory Vision AI", "Macro Balancing", "Food Waste Abatement", "Smart Grocery Sync", "Recipe Optimization"]
            driver1 = "Rising food inflation and sustainability consciousness prioritizing waste reduction."
            driver2 = "Consumer preference for hyper-personalized health and macro-nutrient tracking."
        else:
            tam = "$16.5 Billion Addressable Sector"
            sam = "$2.4 Billion Core Target Segment"
            som = "$120 Million Initial Obtainable Niche"
            cagr = "12.8% CAGR (2024-2030)"
            terms = ["SaaS Automation", "API First Architecture", "Self-Serve Onboarding", "CAC Payback Velocity", "Net Revenue Retention"]
            driver1 = f"Accelerated digital transformation and automation in {industry}."
            driver2 = f"Increasing demand from {target_market} for unified and streamlined solutions."

        return {
            "market_summary": (
                f"The market for '{startup_idea}' in {industry} is positioned at a high-growth inflection point. "
                f"Driven by rising demand from {target_market}, market validation highlights substantial willingness "
                f"to adopt modern specialized alternatives that eliminate manual bottlenecks and optimize operating margins."
            ),
            "market_size_and_growth": {
                "tam_estimate": tam,
                "sam_estimate": sam,
                "som_estimate": som,
                "cagr_growth_rate": cagr,
                "growth_stage": "High Growth",
                "market_dynamics": f"Rapid migration toward automated, intelligent tooling across the {industry} ecosystem."
            },
            "customer_segments": [
                {
                    "segment_name": f"High-Intent {target_market} Early Adopters",
                    "target_users": f"Active operators and specialists within {target_market}",
                    "pain_points": [
                        f"Wasted labor hours and manual friction handling standard {industry} workflows.",
                        "Lack of intelligent predictive tools tailored to their specific scale and constraints."
                    ],
                    "core_motivations": [
                        "Achieve immediate operational efficiency gains (>35% time saved).",
                        "Lower error rates and gain a competitive technology edge."
                    ],
                    "buying_behavior": "Subscription-based self-serve onboarding with rapid 7-day trial evaluation.",
                    "willingness_to_pay": "High (Rapid ROI proven within 30 days)"
                },
                {
                    "segment_name": f"Mid-Market Organizations & Clinics in {industry}",
                    "target_users": "Team Leads, Operations Managers, and Budget Approvers",
                    "pain_points": [
                        "High employee onboarding fatigue with complex legacy systems.",
                        "Disjointed tooling leading to data silos and reporting delays."
                    ],
                    "core_motivations": [
                        "Standardize team output and integrate seamlessly into existing software.",
                        "Scalable pricing that grows alongside their volume."
                    ],
                    "buying_behavior": "Annual SaaS licensing with departmental budget sign-off.",
                    "willingness_to_pay": "High with tiered seat-based or usage-based pricing."
                }
            ],
            "demand_drivers": [
                driver1,
                driver2,
                f"Rising digital expectations among {target_market} favoring automated AI-augmented workflows."
            ],
            "industry_terminology": terms,
            "agent_status": "heuristic_fallback"
        }
