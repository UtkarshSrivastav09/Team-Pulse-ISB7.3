import os
from typing import Dict, Any, List
from services.llm_service import LLMService

class CompetitorDiscoveryAgent:
    """
    Milestone 2 Agent 2: Competitor Discovery & Comparison Agent.
    Analyzes web search snippets, search results, and market context to:
    - Identify Direct & Indirect Competitors
    - Summarize core offerings, strengths, weaknesses, and pricing models
    - Build an interactive Feature & Positioning Comparison Matrix
    - Detect market white spaces, missing features, and tactical differentiation opportunities
    """
    def __init__(self, llm_service: LLMService = None):
        self.llm = llm_service or LLMService()

    def analyze(self, startup_idea: str, industry: str, target_market: str, search_data: dict, market_context: dict = None) -> dict:
        """
        Executes competitor discovery, comparative benchmarking, and white-space analysis.
        """
        search_snippets = ""
        for idx, item in enumerate(search_data.get("results", [])[:6]):
            search_snippets += f"\n[{idx+1}] Name/Title: {item.get('title')}\nDetails: {item.get('content')}\nURL: {item.get('url')}\n"

        market_summary = (market_context or {}).get("market_summary", "")

        system_instruction = (
            "You are an elite Startup Strategy Consultant and Competitive Intelligence Specialist. "
            "Your job is to thoroughly analyze search results, detect direct and indirect competitors, "
            "map their weaknesses and customer complaints, create a comparative matrix, and highlight clear market gaps/white space. "
            "Output strictly valid JSON matching the specified schema."
        )

        prompt = f"""Analyze the competitive landscape for this startup concept using the live search intelligence below.

Startup Concept: "{startup_idea}"
Industry Sector: "{industry}"
Target Market: "{target_market}"
Market Overview Context: "{market_summary}"

Web Competitor Intelligence:
{search_snippets}

Generate a valid JSON object matching the exact schema below:
{{
  "competitor_summary": "A concise 2-sentence summary of the competitor intensity, incumbent dominance vs fragmented players, and market positioning.",
  "direct_competitors": [
    {{
      "name": "Competitor Brand or Solution Name",
      "core_offering": "1-2 sentence crisp description of their main product offering.",
      "key_features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ],
      "strengths": "Main competitive moat, brand presence, or core advantage.",
      "weaknesses_and_complaints": "Key customer complaints, clunky UX, high cost, or missing features.",
      "pricing_model": "e.g., Enterprise Custom Quote, $99/mo tiered SaaS, or freemium",
      "target_customer": "Primary buyer they focus on"
    }},
    {{
      "name": "Second Competitor Brand Name",
      "core_offering": "Crisp description of offering.",
      "key_features": [
        "Feature 1",
        "Feature 2"
      ],
      "strengths": "Primary strength.",
      "weaknesses_and_complaints": "Primary weakness or limitation.",
      "pricing_model": "Pricing strategy",
      "target_customer": "Target buyer"
    }}
  ],
  "indirect_competitors": [
    {{
      "name": "Indirect Competitor / Substitute Method",
      "category": "e.g., Manual Spreadsheets / Generic Platforms / Agency Services",
      "offering_summary": "How customers currently solve this problem indirectly.",
      "limitations": "Why this indirect solution falls short for modern users."
    }}
  ],
  "comparison_matrix": {{
    "dimensions": [
      "AI Automation & Intelligence",
      "Ease of Implementation",
      "Domain Specialization",
      "Pricing Accessibility",
      "Real-Time Capabilities"
    ],
    "startup_idea": {{
      "name": "Proposed Startup",
      "scores": {{
        "AI Automation & Intelligence": "High (Native)",
        "Ease of Implementation": "Fast / Self-Serve",
        "Domain Specialization": "Tailored for Niche",
        "Pricing Accessibility": "High Value / Affordable",
        "Real-Time Capabilities": "Instant / Real-Time"
      }}
    }},
    "competitor_rows": [
      {{
        "name": "Primary Incumbent / Competitor 1",
        "scores": {{
          "AI Automation & Intelligence": "Moderate / Legacy",
          "Ease of Implementation": "Complex Onboarding",
          "Domain Specialization": "Broad & Generic",
          "Pricing Accessibility": "Expensive / Enterprise Lock-in",
          "Real-Time Capabilities": "Batch / Delayed"
        }}
      }},
      {{
        "name": "Secondary Competitor / Alternative",
        "scores": {{
          "AI Automation & Intelligence": "Low / Manual",
          "Ease of Implementation": "Moderate",
          "Domain Specialization": "Partial",
          "Pricing Accessibility": "Moderate",
          "Real-Time Capabilities": "Limited"
        }}
      }}
    ]
  }},
  "market_gaps_and_white_space": [
    "Market Gap 1: Specific underserved niche or overlooked feature by existing players",
    "Market Gap 2: High friction / cost barrier in current solutions that can be undercut",
    "Market Gap 3: Technology shift (e.g. specialized AI workflows) that incumbents are slow to adopt"
  ],
  "differentiation_strategy": [
    "Actionable Go-To-Market and positioning wedge #1",
    "Actionable Product differentiation recommendation #2",
    "Actionable Customer retention and moat-building tactic #3"
  ]
}}
"""
        # Call LLM
        result = self.llm.generate_structured_json(prompt, system_instruction)
        if result and "direct_competitors" in result and "market_gaps_and_white_space" in result:
            result["agent_status"] = "live_llm"
            return result

        # Fallback heuristic analyzer
        return self._heuristic_fallback(startup_idea, industry, target_market, search_data)

    def _heuristic_fallback(self, startup_idea: str, industry: str, target_market: str, search_data: dict) -> dict:
        """
        Dynamically extracts competitor names and builds structured comparison when LLM keys are absent.
        """
        results = search_data.get("results", [])
        competitor_names = []
        for r in results:
            title = r.get("title", "")
            # Clean title to extract entity name
            clean_name = title.split(" - ")[0].split(" | ")[0].split(":")[0].strip()
            if clean_name and len(clean_name) < 35 and clean_name.lower() not in ["home", "about", "top 10", "competitor matrix"]:
                competitor_names.append(clean_name)

        comp1 = competitor_names[0] if len(competitor_names) > 0 else f"Legacy {industry} Suite"
        comp2 = competitor_names[1] if len(competitor_names) > 1 else f"{industry} Direct Pro"

        lower_ind = industry.lower()

        if any(w in lower_ind for w in ["health", "pet", "bio", "med"]):
            gap1 = "Lack of instant, photo-assisted AI preliminary triage before veterinary appointments."
            gap2 = "High consultation minimum fees making routine checkups prohibitive for pet owners."
            gap3 = "Fragmented communication between emergency telehealth and local clinic record systems."
            comp1_weak = "High per-call pricing ($45-$70), lengthy video queue wait times, no automated image diagnosis."
            comp2_weak = "Basic symptom checklist without intelligent image analysis; clunky mobile experience."
        elif any(w in lower_ind for w in ["green", "logist", "cargo", "mobility", "transport"]):
            gap1 = "Legacy route planners optimize for standard trucks, ignoring bike paths, bridge weight limits, and battery range."
            gap2 = "Lack of micro-hub delivery clustering tailored to high-density pedestrian urban zones."
            gap3 = "High upfront telematics hardware costs locking out independent bike couriers and small merchants."
            comp1_weak = "Built for standard motor vehicles; fails to calculate cargo bike battery depletion or pedestrian zone access."
            comp2_weak = "Complex enterprise ERP requirement; requires weeks of manual route setup and dispatcher training."
        elif any(w in lower_ind for w in ["edtech", "educat", "learn", "study"]):
            gap1 = "Existing tools only provide static digital flashcards without active contextual AI question synthesis."
            gap2 = "High manual effort required by students to copy-paste lecture transcripts and textbook chapters."
            gap3 = "Lack of personalized spaced-repetition algorithms calibrated to university exam dates."
            comp1_weak = "Static user-generated deck repository; high proportion of outdated or inaccurate community cards."
            comp2_weak = "Generic chatbot interface without structured flashcard scheduling, active recall, or exam simulation."
        else:
            gap1 = f"Incumbents in {industry} are built on rigid legacy architectures that are slow to configure."
            gap2 = f"Over-engineered enterprise feature sets that overwhelm and overcharge {target_market}."
            gap3 = f"Absence of end-to-end AI-native automation tailored for modern {target_market} workflows."
            comp1_weak = "High enterprise pricing tiers with lengthy mandatory annual contracts and complex onboarding."
            comp2_weak = "Fragmented point-solution that fails to automate full workflow lifecycle."

        return {
            "competitor_summary": (
                f"The competitive landscape in {industry} features a mix of established legacy incumbents and point-solution tools. "
                f"While incumbents hold general market awareness, they suffer from high pricing friction, complex onboarding, "
                f"and a distinct lack of agile AI workflows tailored specifically for {target_market}."
            ),
            "direct_competitors": [
                {
                    "name": comp1,
                    "core_offering": f"Established platform offering standard workflow and management solutions for the {industry} sector.",
                    "key_features": [
                        "Core Management Dashboard",
                        "Standard Reporting & Analytics",
                        "Basic Notification System"
                    ],
                    "strengths": "Established market presence, wide customer footprint, and enterprise vendor certifications.",
                    "weaknesses_and_complaints": comp1_weak,
                    "pricing_model": "Tiered SaaS from $99/mo to Custom Enterprise ($1,500+/mo)",
                    "target_customer": f"Large enterprise organizations and traditional operations in {industry}"
                },
                {
                    "name": comp2,
                    "core_offering": f"Alternative software tool providing targeted operational features within {industry}.",
                    "key_features": [
                        "Self-Serve Portal",
                        "Manual Data Entry & Export",
                        "Standard Third-Party Integrations"
                    ],
                    "strengths": "Lower price point than legacy incumbents and familiar user interface.",
                    "weaknesses_and_complaints": comp2_weak,
                    "pricing_model": "$29 - $79 per user/month",
                    "target_customer": f"Mid-market teams and smaller operators in {industry}"
                }
            ],
            "indirect_competitors": [
                {
                    "name": "Manual Spreadsheets & Generic Productivity Tools",
                    "category": "In-house Manual Processes (Excel, Notion, Google Sheets)",
                    "offering_summary": f"Teams using DIY spreadsheets and disparate chat tools to coordinate {industry} tasks.",
                    "limitations": "Zero automated predictive intelligence, high human error rates, and zero scalability as volume expands."
                },
                {
                    "name": "Generic Horizontal AI Tools",
                    "category": "Generalist Chatbots (ChatGPT, Claude)",
                    "offering_summary": "Users manually prompting generic LLMs for ad-hoc assistance without domain integration.",
                    "limitations": f"No native integrations with {industry} data sources, lacks structured validation, and requires constant manual prompt engineering."
                }
            ],
            "comparison_matrix": {
                "dimensions": [
                    "AI Automation & Intelligence",
                    "Ease of Implementation",
                    "Domain Specialization",
                    "Pricing Accessibility",
                    "Real-Time Capabilities"
                ],
                "startup_idea": {
                  "name": "Proposed Startup Concept",
                  "scores": {
                    "AI Automation & Intelligence": "High (Native)",
                    "Ease of Implementation": "Instant / Self-Serve",
                    "Domain Specialization": f"100% Focused on {industry}",
                    "Pricing Accessibility": "High Value / Accessible",
                    "Real-Time Capabilities": "Instant / Real-Time"
                  }
                },
                "competitor_rows": [
                    {
                        "name": comp1,
                        "scores": {
                            "AI Automation & Intelligence": "Low / Retrofitted",
                            "Ease of Implementation": "Complex (2-4 Weeks)",
                            "Domain Specialization": "Broad & Generic",
                            "Pricing Accessibility": "Expensive / Enterprise",
                            "Real-Time Capabilities": "Batch / Delayed"
                        }
                    },
                    {
                        "name": comp2,
                        "scores": {
                            "AI Automation & Intelligence": "Moderate / Basic Rules",
                            "Ease of Implementation": "Moderate (1 Week)",
                            "Domain Specialization": "Partial",
                            "Pricing Accessibility": "Mid-tier",
                            "Real-Time Capabilities": "Limited"
                        }
                    }
                ]
            },
            "market_gaps_and_white_space": [
                gap1,
                gap2,
                gap3
            ],
            "differentiation_strategy": [
                f"Position as the only purpose-built, AI-native platform designed exclusively for {target_market}.",
                "Offer a friction-free self-serve freemium/trial model to capture bottoms-up adoption ahead of legacy sales cycles.",
                "Deliver instant automated time-to-value within 5 minutes of signup, directly addressing the complex onboarding of incumbents."
            ],
            "agent_status": "heuristic_fallback"
        }
