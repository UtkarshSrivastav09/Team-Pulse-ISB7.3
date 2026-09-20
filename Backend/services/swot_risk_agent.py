import os
from typing import Dict, Any, List
from services.llm_service import LLMService

class SWOTRiskAgent:
    """
    Milestone 3 Agent 1: SWOT & Risk Analysis Agent.
    Generates:
    - Structured Strengths, Weaknesses, Opportunities, and Threats (SWOT) using LLM reasoning.
    - Multi-dimensional Risk Assessment (Technical, Market, Regulatory, Financial).
    - Quantitative risk severity levels (High/Medium/Low) and actionable mitigation playbooks.
    """
    def __init__(self, llm_service: LLMService = None):
        self.llm = llm_service or LLMService()

    def analyze(
        self,
        startup_idea: str,
        industry: str,
        target_market: str,
        search_data: dict,
        market_context: dict = None,
        competitor_context: dict = None
    ) -> dict:
        """
        Executes SWOT and Risk analysis across the venture concept.
        """
        search_snippets = ""
        for idx, item in enumerate(search_data.get("results", [])[:5]):
            search_snippets += f"\n[{idx+1}] {item.get('title')}: {item.get('content')}"

        market_summary = (market_context or {}).get("market_summary", "")
        competitor_summary = (competitor_context or {}).get("competitor_summary", "")

        system_instruction = (
            "You are a Principal Venture Capital Risk Auditor and Strategic Management Consultant. "
            "Evaluate early-stage startup ideas and produce a structured SWOT analysis along with a "
            "comprehensive Risk Assessment matrix with concrete mitigation strategies. Output strictly valid JSON."
        )

        prompt = f"""Conduct a thorough SWOT analysis and Risk Assessment for this startup:

Startup Concept: "{startup_idea}"
Industry Vertical: "{industry}"
Target Audience: "{target_market}"

Market Intelligence Context:
{market_summary}

Competitor Landscape Context:
{competitor_summary}

Web Evidence Snippets:
{search_snippets}

Output a valid JSON object matching this exact schema:
{{
  "swot_summary": "A 2-sentence executive summary of the venture's strategic positioning and risk-reward profile.",
  "swot": {{
    "strengths": [
      {{
        "title": "Clear strength title",
        "description": "Specific internal capability, technological advantage, or operating model strength.",
        "strategic_impact": "High / Medium"
      }},
      {{
        "title": "Second strength title",
        "description": "Description of operational or distribution advantage.",
        "strategic_impact": "High"
      }},
      {{
        "title": "Third strength title",
        "description": "Description of data, workflow, or user experience moat.",
        "strategic_impact": "Medium"
      }}
    ],
    "weaknesses": [
      {{
        "title": "Clear internal weakness title",
        "description": "Internal bottleneck, resource intensity, or cold-start limitation.",
        "severity": "High / Medium"
      }},
      {{
        "title": "Second weakness title",
        "description": "Specific product or go-to-market vulnerability.",
        "severity": "Medium"
      }},
      {{
        "title": "Third weakness title",
        "description": "Dependency or operational overhead.",
        "severity": "Medium / Low"
      }}
    ],
    "opportunities": [
      {{
        "title": "Market opportunity title",
        "description": "External tailwind, unaddressed market segment, or expansion vector.",
        "potential_upside": "High"
      }},
      {{
        "title": "Second opportunity title",
        "description": "Partnership or platform integration catalyst.",
        "potential_upside": "High / Medium"
      }},
      {{
        "title": "Third opportunity title",
        "description": "Adjacent market monetization vector.",
        "potential_upside": "Medium"
      }}
    ],
    "threats": [
      {{
        "title": "External threat title",
        "description": "Incumbent response, Big Tech commoditization, or regulatory headwind.",
        "urgency": "High / Medium"
      }},
      {{
        "title": "Second threat title",
        "description": "Market adoption inertia or macroeconomic risk.",
        "urgency": "Medium"
      }},
      {{
        "title": "Third threat title",
        "description": "Alternative substitutes or API dependency risks.",
        "urgency": "Medium / Low"
      }}
    ]
  }},
  "risk_assessment": [
    {{
      "category": "Technical & Operational Feasibility",
      "risk_title": "Primary technical risk description",
      "severity": "High / Medium / Low",
      "probability": "High / Medium / Low",
      "mitigation_strategy": "Concrete architectural or operational action to mitigate this risk."
    }},
    {{
      "category": "Market Adoption & Customer Inertia",
      "risk_title": "Primary market friction or adoption barrier",
      "severity": "High / Medium / Low",
      "probability": "High / Medium / Low",
      "mitigation_strategy": "Concrete go-to-market or product onboarding playbook to overcome hesitation."
    }},
    {{
      "category": "Regulatory & Legal Compliance",
      "risk_title": "Industry-specific compliance or liability exposure",
      "severity": "Medium / Low",
      "probability": "Medium / Low",
      "mitigation_strategy": "Compliance framework, audits, or legal safeguards to put in place."
    }},
    {{
      "category": "Financial & Runway Sustainability",
      "risk_title": "Unit economics, CAC escalation, or monetization barrier",
      "severity": "High / Medium",
      "probability": "Medium",
      "mitigation_strategy": "Pricing strategy, margin optimization, or pilot pre-selling approach."
    }}
  ],
  "overall_risk_score": 28,
  "risk_verdict": "Moderate Risk — Highly Defensible with Targeted Mitigations"
}}
"""
        # Call LLM
        result = self.llm.generate_structured_json(prompt, system_instruction)
        if result and "swot" in result and "risk_assessment" in result:
            result["agent_status"] = "live_llm"
            return result

        # Heuristic fallback
        return self._heuristic_fallback(startup_idea, industry, target_market, search_data)

    def _heuristic_fallback(self, startup_idea: str, industry: str, target_market: str, search_data: dict) -> dict:
        """
        Synthesizes robust domain-aware SWOT and Risk analysis when LLM API keys are unconfigured.
        """
        lower_idea = startup_idea.lower()
        lower_ind = industry.lower()

        if any(w in lower_ind for w in ["health", "pet", "bio", "med"]):
            s1 = "High-accuracy specialized AI triage tailored specifically for clinical / pet health protocols."
            s2 = "Direct-to-consumer mobile workflow delivering instant reassurance and eliminating emergency clinic friction."
            w1 = "Requires rigorous diagnostic verification and disclaimer handling to limit medical liability."
            w2 = "Customer acquisition costs in consumer health can inflate without vet clinic referral partnerships."
            o1 = "B2B SaaS partnerships with veterinary hospital networks for after-hours automated intake."
            o2 = "Pet insurance integration offering premium discounts for users utilizing preventive tele-triage."
            t1 = "Regulatory scrutiny around automated medical guidance and diagnostic claims."
            t2 = "Incumbent telehealth apps adding rudimentary photo triage features."
            tech_risk = "Model hallucination or inaccurate symptom classification on low-light smartphone photos."
            tech_mit = "Implement confidence scoring thresholds with instant routing to licensed vets for borderline cases."
            reg_risk = "Veterinary state licensing restrictions and telehealth prescription compliance."
            reg_mit = "Position explicitly as a triage pre-screener rather than a binding medical diagnosis; secure regional veterinary advisor sign-offs."
        elif any(w in lower_ind for w in ["green", "logist", "cargo", "mobility", "transport"]):
            s1 = "Proprietary routing algorithms optimized specifically for urban bike lanes, grade elevation, and payload capacity."
            s2 = "Direct operating cost savings and compliance with municipal zero-emission mandates."
            w1 = "Initial battery degradation and fleet maintenance overhead under heavy weather conditions."
            w2 = "Integration friction with legacy third-party dispatch and ERP software."
            o1 = "Municipal carbon credit monetization and urban green delivery subsidies."
            o2 = "B2B fleet management expansion across micro-fulfillment grocery and pharmaceutical hubs."
            t1 = "Rapid commoditization of standard route optimization APIs by legacy mapping giants."
            t2 = "Adverse municipal regulations regarding sidewalk and pedestrian zone usage."
            tech_risk = "Dynamic traffic and elevation sensor synchronization latency during peak hours."
            tech_mit = "Deploy offline-first edge caching on rider devices with asynchronous batch telemetry syncing."
            reg_risk = "City micro-mobility speed restrictions and commercial cargo weight caps."
            reg_mit = "Build modular configuration profiles per city jurisdiction to auto-enforce local compliance."
        elif any(w in lower_ind for w in ["edtech", "educat", "learn", "study"]):
            s1 = "Active recall and spaced repetition synthesis automatically generated from raw unstructured lecture materials."
            s2 = "Rapid user viral loops and textbook-specific community knowledge sharing."
            w1 = "High seasonal churn aligned with university exam semesters and summer breaks."
            w2 = "Dependency on students' self-motivation without institutional LMS grading incentives."
            o1 = "Institutional university departmental licensing for teaching assistants and professors."
            o2 = "Standardized test prep expansion (GRE, USMLE, Bar Exam) with premium monetization."
            t1 = "Foundation LLMs (ChatGPT, Gemini) offering generic summarization and flashcards out-of-the-box."
            t2 = "Academic integrity policies restricting automated test generation tools."
            tech_risk = "Textbook PDF extraction errors on mathematical notations, formulas, and diagrams."
            tech_mit = "Incorporate specialized LaTeX OCR parsers and visual diagram bounding-box extractors."
            reg_risk = "Copyright and fair-use disputes regarding university lecture transcript indexing."
            reg_mit = "Maintain student-private local workspaces where source documents are never trained upon or publicly published."
        else:
            s1 = f"Deeply specialized vertical AI workflow solving core bottlenecks in {industry}."
            s2 = f"Streamlined self-serve onboarding tailored for {target_market}."
            w1 = f"Cold-start data network effects before platform reaches critical volume in {industry}."
            w2 = "High dependency on third-party foundational LLM API latency and token pricing."
            o1 = f"Platform ecosystem expansion into ancillary workflow tools across {industry}."
            o2 = f"Enterprise tier upselling with custom integrations and dedicated SLAs."
            t1 = f"Aggressive feature replication by legacy incumbents in {industry}."
            t2 = "Macroeconomic tech budget tightening slowing B2B procurement cycles."
            tech_risk = "Reliability and latency of multi-agent LLM reasoning during peak traffic."
            tech_mit = "Implement structured response caching, asynchronous queueing, and fallback rule heuristics."
            reg_risk = f"Data privacy (GDPR/SOC2) and data residency compliance expectations within {industry}."
            reg_mit = "Enforce end-to-end tenant encryption and provide local on-premise export capabilities."

        return {
            "swot_summary": (
                f"VenturePulse strategic audit indicates high opportunity potential for '{startup_idea}' "
                f"in {industry}. The core strength lies in vertical domain specialization for {target_market}, "
                f"while primary risk management must focus on technical defensibility and customer onboarding velocity."
            ),
            "swot": {
                "strengths": [
                    {
                        "title": "Vertical Domain Specialization",
                        "description": s1,
                        "strategic_impact": "High"
                    },
                    {
                        "title": "Frictionless User Experience",
                        "description": s2,
                        "strategic_impact": "High"
                    },
                    {
                        "title": "Agile Operating Model",
                        "description": f"Lean cloud-native infrastructure with low initial fixed CapEx compared to legacy {industry} systems.",
                        "strategic_impact": "Medium"
                    }
                ],
                "weaknesses": [
                    {
                        "title": "Domain Onboarding Friction",
                        "description": w1,
                        "severity": "Medium"
                    },
                    {
                        "title": "Go-To-Market Execution Overhead",
                        "description": w2,
                        "severity": "Medium"
                    },
                    {
                        "title": "Foundational API Dependency",
                        "description": "Reliance on external AI models requiring active fallback caching to protect margins.",
                        "severity": "Medium"
                    }
                ],
                "opportunities": [
                    {
                        "title": "Enterprise B2B Expansion",
                        "description": o1,
                        "potential_upside": "High"
                    },
                    {
                        "title": "Ecosystem Integrations & Partnerships",
                        "description": o2,
                        "potential_upside": "High"
                    },
                    {
                        "title": "Proprietary Data Moat Accretion",
                        "description": "Continuous capture of anonymized domain telemetry creates an escalating defensibility moat over time.",
                        "potential_upside": "Medium"
                    }
                ],
                "threats": [
                    {
                        "title": "Incumbent Feature Fast-Follows",
                        "description": t1,
                        "urgency": "High"
                    },
                    {
                        "title": "Market Adoption Inertia",
                        "description": t2,
                        "urgency": "Medium"
                    },
                    {
                        "title": "Platform Pricing Pressure",
                        "description": "Price erosion from lower-tier generic AI tools requiring clear proof of ROI.",
                        "urgency": "Medium"
                    }
                ]
            },
            "risk_assessment": [
                {
                    "category": "Technical & Operational Feasibility",
                    "risk_title": tech_risk,
                    "severity": "Medium",
                    "probability": "Low",
                    "mitigation_strategy": tech_mit
                },
                {
                    "category": "Market Adoption & Customer Inertia",
                    "risk_title": f"Reluctance of {target_market} to abandon established legacy workflows.",
                    "severity": "Medium",
                    "probability": "Medium",
                    "mitigation_strategy": "Offer a zero-risk 14-day interactive trial with 1-click data import to demonstrate immediate time savings."
                },
                {
                    "category": "Regulatory & Legal Compliance",
                    "risk_title": reg_risk,
                    "severity": "Medium",
                    "probability": "Low",
                    "mitigation_strategy": reg_mit
                },
                {
                    "category": "Financial & Runway Sustainability",
                    "risk_title": "Initial customer acquisition cost (CAC) exceeding early subscription revenue.",
                    "severity": "Medium",
                    "probability": "Medium",
                    "mitigation_strategy": "Focus strictly on organic community acquisition and high-converting inbound content to maintain CAC payback < 4 months."
                }
            ],
            "overall_risk_score": 26,
            "risk_verdict": "Low-to-Moderate Risk — High Feasibility with Clear Mitigation Vectors",
            "agent_status": "heuristic_fallback"
        }
