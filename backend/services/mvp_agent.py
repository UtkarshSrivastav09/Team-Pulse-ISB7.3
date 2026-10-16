import os
from typing import Dict, Any, List
from services.llm_service import LLMService

class MVPFeatureAgent:
    """
    Milestone 3 Agent 2: MVP Feature Recommendation Agent.
    Prioritizes core product features based on market fit, customer friction,
    and startup resource constraints using the MoSCoW framework and an Effort vs Impact matrix.
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
        competitor_context: dict = None,
        swot_context: dict = None
    ) -> dict:
        """
        Executes MVP feature prioritization and scoping analysis.
        """
        market_summary = (market_context or {}).get("market_summary", "")
        customer_segments = (market_context or {}).get("customer_segments", [])
        pain_points = []
        for seg in customer_segments:
            pain_points.extend(seg.get("pain_points", []))

        gaps = (competitor_context or {}).get("market_gaps_and_white_space", [])

        system_instruction = (
            "You are a Senior VP of Product Management and Startup Technical Co-Founder. "
            "Your objective is to define a razor-sharp, lean MVP feature roadmap for early-stage startups "
            "using the MoSCoW prioritization model and an Effort-vs-Impact scoring matrix. Output strictly valid JSON."
        )

        prompt = f"""Design a lean MVP feature roadmap for the startup concept below:

Startup Concept: "{startup_idea}"
Industry Vertical: "{industry}"
Target Audience: "{target_market}"

Identified Customer Pain Points:
{pain_points}

Identified Competitor Gaps & White Spaces:
{gaps}

Return a valid JSON object matching this exact schema:
{{
  "mvp_philosophy": "A 2-sentence product philosophy outlining the core value loop and lean build focus.",
  "moscow_matrix": {{
    "must_have": [
      {{
        "feature_name": "Feature Title",
        "description": "Why this feature is critical for initial problem-solution fit.",
        "user_value": "Immediate benefit to user",
        "effort_score": 5,
        "impact_score": 9,
        "category": "Core Workflow / AI Engine / Onboarding"
      }},
      {{
        "feature_name": "Second Must-Have Feature",
        "description": "Feature explanation and problem addressed.",
        "user_value": "Key user value",
        "effort_score": 4,
        "impact_score": 8,
        "category": "Core Workflow"
      }}
    ],
    "should_have": [
      {{
        "feature_name": "Should-Have Feature Title",
        "description": "High value feature to include immediately after core loop is validated.",
        "user_value": "User benefit",
        "effort_score": 6,
        "impact_score": 7,
        "category": "Analytics / Integration"
      }},
      {{
        "feature_name": "Second Should-Have Feature",
        "description": "Feature explanation.",
        "user_value": "User benefit",
        "effort_score": 5,
        "impact_score": 7,
        "category": "Collaboration"
      }}
    ],
    "could_have": [
      {{
        "feature_name": "Could-Have Feature Title",
        "description": "Nice-to-have delight feature if sprint bandwidth permits.",
        "user_value": "Secondary benefit",
        "effort_score": 7,
        "impact_score": 5,
        "category": "Enhancement"
      }}
    ],
    "wont_have_v1": [
      {{
        "feature_name": "Excluded V1 Feature Title",
        "rationale": "Explicit reason to omit from V1 to prevent scope creep and save runway."
      }},
      {{
        "feature_name": "Second Excluded Feature",
        "rationale": "Why this should wait for Series A / scale phase."
      }}
    ]
  }},
  "sprint_roadmap": {{
    "phase_1_30_days": "Primary 30-day build milestone focusing on the core Must-Have loop.",
    "phase_2_60_days": "Secondary 60-day milestone introducing Should-Have integrations and retention triggers."
  }},
  "estimated_mvp_build_time_weeks": 6,
  "recommended_tech_stack": [
    "Frontend Framework",
    "Backend & AI Layer",
    "Database & Telemetry"
  ]
}}
"""
        # Call LLM
        result = self.llm.generate_structured_json(prompt, system_instruction)
        if result and "moscow_matrix" in result and "must_have" in result.get("moscow_matrix", {}):
            result["agent_status"] = "live_llm"
            return result

        # Fallback heuristic generator
        return self._heuristic_fallback(startup_idea, industry, target_market, search_data)

    def _heuristic_fallback(self, startup_idea: str, industry: str, target_market: str, search_data: dict) -> dict:
        """
        Synthesizes robust domain-aware MVP feature prioritization when LLM API keys are unconfigured.
        """
        lower_idea = startup_idea.lower()
        lower_ind = industry.lower()

        if any(w in lower_ind for w in ["health", "pet", "bio", "med"]):
            must = [
                {
                    "feature_name": "Instant Photo AI Symptom Triage",
                    "description": "Allows pet owners to upload clear smartphone photos of symptoms (eyes, skin, gait) and receive instant triage urgency classification in <15 seconds.",
                    "user_value": "Eliminates panic and gives immediate guidance on whether an emergency clinic visit is required.",
                    "effort_score": 6,
                    "impact_score": 10,
                    "category": "AI Diagnostic Engine"
                },
                {
                    "feature_name": "1-Click Telehealth Video Consultation Booking",
                    "description": "Streamlined booking flow connecting high-urgency triage cases with licensed veterinarians within 10 minutes.",
                    "user_value": "Seamless escalation from automated AI assessment to licensed human care.",
                    "effort_score": 4,
                    "impact_score": 9,
                    "category": "Core Workflow"
                },
                {
                    "feature_name": "Structured Pet Health Profile & Medication Tracker",
                    "description": "Lightweight pet profile storing age, breed, allergies, and vaccination history for contextual triage.",
                    "user_value": "Provides historical context for personalized triage accuracy.",
                    "effort_score": 3,
                    "impact_score": 8,
                    "category": "Onboarding"
                }
            ]
            should = [
                {
                    "feature_name": "Prescription & OTC Medication Routing",
                    "description": "Automated dispatch of recommended OTC treatments and digital prescriptions to partner pharmacies.",
                    "user_value": "End-to-end resolution without leaving home.",
                    "effort_score": 6,
                    "impact_score": 7,
                    "category": "Integrations"
                },
                {
                    "feature_name": "Emergency Clinic Route & Wait-Time Finder",
                    "description": "Geolocation locator mapping nearest 24/7 emergency pet hospitals with live phone triage.",
                    "user_value": "Lifesaving navigation for critical red-flag symptoms.",
                    "effort_score": 4,
                    "impact_score": 7,
                    "category": "Geo-Services"
                }
            ]
            could = [
                {
                    "feature_name": "AI Diet & Nutrition Meal Customizer",
                    "description": "Breed-specific nutritional guidance and daily calorie targets based on pet activity.",
                    "user_value": "Long-term daily retention driver.",
                    "effort_score": 5,
                    "impact_score": 6,
                    "category": "Wellness"
                }
            ]
            wont = [
                {
                    "feature_name": "Custom Hardware / IoT Smart Collar Integration",
                    "rationale": "Avoid CapEx-heavy hardware manufacturing in V1; focus purely on frictionless software mobile triage."
                },
                {
                    "feature_name": "Full In-House Clinic Management ERP Suite",
                    "rationale": "High sales friction and elongated 9-month enterprise procurement cycles; launch self-serve first."
                }
            ]
            stack = ["React Native / Vite PWA", "FastAPI + PyTorch / Gemini Vision API", "PostgreSQL + HIPAA-ready AWS/GCP Storage"]
        elif any(w in lower_ind for w in ["green", "logist", "cargo", "mobility", "transport"]):
            must = [
                {
                    "feature_name": "Cargo-Optimized Dynamic Route Planner",
                    "description": "Multi-stop routing engine tailored for e-cargo bike weight limits, bike lane networks, and elevation slope optimization.",
                    "user_value": "Cuts delivery cycle times by 32% while preserving battery range.",
                    "effort_score": 6,
                    "impact_score": 10,
                    "category": "Routing Engine"
                },
                {
                    "feature_name": "Live Rider Navigation & Battery Telemetry App",
                    "description": "Turn-by-turn mobile navigation with real-time state-of-charge warnings and micro-hub waypoint guidance.",
                    "user_value": "Eliminates dead-battery stranding during high-volume delivery shifts.",
                    "effort_score": 5,
                    "impact_score": 9,
                    "category": "Mobile Fleet Ops"
                },
                {
                    "feature_name": "Dispatcher Real-Time Map & Order Batching",
                    "description": "Web dashboard for fleet managers to automatically cluster incoming parcels into optimal cargo bike routes.",
                    "user_value": "Reduces manual dispatch coordination time from 45 mins to 2 mins.",
                    "effort_score": 5,
                    "impact_score": 8,
                    "category": "Dispatcher Dashboard"
                }
            ]
            should = [
                {
                    "feature_name": "Automated Low-Emission Zone Compliance & Carbon Auditing",
                    "description": "Real-time logging of CO2 grams saved per delivery for ESG corporate reporting and tax subsidies.",
                    "user_value": "Unlocks green municipal grants and enterprise B2B sales pitches.",
                    "effort_score": 4,
                    "impact_score": 7,
                    "category": "ESG Analytics"
                },
                {
                    "feature_name": "Shopify & WooCommerce 1-Click Order Sync",
                    "description": "Direct plugin webhook syncing e-commerce orders straight to bike delivery queues.",
                    "user_value": "Zero-friction merchant onboarding.",
                    "effort_score": 5,
                    "impact_score": 7,
                    "category": "Integrations"
                }
            ]
            could = [
                {
                    "feature_name": "Predictive Weather & Route Maintenance Alerts",
                    "description": "Precipitation and road condition warnings dynamically rerouting riders around slippery surfaces.",
                    "user_value": "Improves rider safety and minimizes parcel damage.",
                    "effort_score": 5,
                    "impact_score": 5,
                    "category": "Safety"
                }
            ]
            wont = [
                {
                    "feature_name": "Proprietary Autonomous Delivery Drones/Robots",
                    "rationale": "Massive regulatory barriers and heavy hardware R&D costs; prioritize scalable human-powered e-cargo fleets."
                },
                {
                    "feature_name": "Global Cross-Border Freight Management",
                    "rationale": "High operational complexity outside core hyper-local last-mile urban density."
                }
            ]
            stack = ["React 18 + Mapbox GL JS", "FastAPI + OSRM / GraphHopper Engine", "Redis Cache + PostgreSQL PostGIS"]
        elif any(w in lower_ind for w in ["edtech", "educat", "learn", "study"]):
            must = [
                {
                    "feature_name": "1-Click PDF & Audio Lecture Knowledge Parser",
                    "description": "Instantly ingests dense academic textbooks, slides, and recorded lecture transcripts into structured concept graphs.",
                    "user_value": "Turns a 200-page chapter into core study milestones in <30 seconds.",
                    "effort_score": 5,
                    "impact_score": 10,
                    "category": "AI Ingestion Engine"
                },
                {
                    "feature_name": "Active Recall Flashcards & Spaced Repetition",
                    "description": "Auto-generates high-yield flashcard decks with SM-2 spaced repetition algorithms for optimal memory retention.",
                    "user_value": "Proven 40% improvement in exam test score retention.",
                    "effort_score": 4,
                    "impact_score": 9,
                    "category": "Study Engine"
                },
                {
                    "feature_name": "Dynamic Mock Exam & Step-by-Step Solution Tutor",
                    "description": "Simulates realistic timed exam papers with instant grading and interactive AI conceptual explanations for incorrect answers.",
                    "user_value": "Provides unlimited practice tests without hiring private tutors.",
                    "effort_score": 5,
                    "impact_score": 9,
                    "category": "Assessment"
                }
            ]
            should = [
                {
                    "feature_name": "Collaborative Study Groups & Deck Sharing",
                    "description": "Enables classmates to co-edit notes, share verified test banks, and compare quiz leaderboards.",
                    "user_value": "Drives organic viral referral loops across university campuses.",
                    "effort_score": 5,
                    "impact_score": 7,
                    "category": "Community"
                },
                {
                    "feature_name": "Canvas & Blackboard LMS Sync",
                    "description": "Imports upcoming exam dates, syllabi, and assignment rubrics automatically.",
                    "user_value": "Removes manual file upload friction.",
                    "effort_score": 6,
                    "impact_score": 7,
                    "category": "Integrations"
                }
            ]
            could = [
                {
                    "feature_name": "Voice-Interactive Socratic Audio Tutor",
                    "description": "Conversational voice agent that quizzes students verbally while walking or commuting.",
                    "user_value": "Convenient hands-free review sessions.",
                    "effort_score": 7,
                    "impact_score": 6,
                    "category": "Audio AI"
                }
            ]
            wont = [
                {
                    "feature_name": "Full Accredited Degree / Course Hosting Platform",
                    "rationale": "High legal accreditation overhead; position as a student-focused study copilot rather than an educational institution."
                },
                {
                    "feature_name": "Live 1-on-1 Human Tutoring Marketplace",
                    "rationale": "Low gross margins and heavy marketplace matchmaking operations; focus on 90%+ gross margin automated software."
                }
            ]
            stack = ["React + Tailwind / Vanilla CSS", "FastAPI + LangChain / Gemini 1.5", "Supabase PostgreSQL + pgvector"]
        else:
            must = [
                {
                    "feature_name": f"Core Intelligent {industry} Workflow Engine",
                    "description": f"Automates the primary bottleneck for {target_market} with instant results and guided actions.",
                    "user_value": "Provides immediate 10x speedup over manual tools.",
                    "effort_score": 5,
                    "impact_score": 9,
                    "category": "Core Engine"
                },
                {
                    "feature_name": "Intuitive Self-Serve Onboarding Dashboard",
                    "description": "Frictionless 3-step setup process allowing new users to achieve first value in under 2 minutes.",
                    "user_value": "High conversion from trial to paid active subscription.",
                    "effort_score": 4,
                    "impact_score": 8,
                    "category": "Onboarding"
                },
                {
                    "feature_name": "Structured Export & Shareable Reporting",
                    "description": "Generates exportable PDF, CSV, and executive markdown summaries for team stakeholders.",
                    "user_value": "Facilitates internal stakeholder buy-in.",
                    "effort_score": 3,
                    "impact_score": 8,
                    "category": "Reporting"
                }
            ]
            should = [
                {
                    "feature_name": "API & Webhook Data Integrations",
                    "description": f"Standard REST API connections into existing ecosystem tools in {industry}.",
                    "user_value": "Seamless integration into daily operational workflows.",
                    "effort_score": 6,
                    "impact_score": 7,
                    "category": "Integrations"
                },
                {
                    "feature_name": "Role-Based Team Workspace & Permissions",
                    "description": "Multi-user collaboration accounts with admin and contributor access tiers.",
                    "user_value": "Enables expansion from single-user to organization-wide contracts.",
                    "effort_score": 5,
                    "impact_score": 7,
                    "category": "Workspace"
                }
            ]
            could = [
                {
                    "feature_name": "Predictive Trend & Anomaly Alerts",
                    "description": "Automated background email/Slack alerts highlighting operational opportunities.",
                    "user_value": "Proactive notification value.",
                    "effort_score": 5,
                    "impact_score": 5,
                    "category": "Alerts"
                }
            ]
            wont = [
                {
                    "feature_name": "Custom On-Premise Legacy Enterprise Installations",
                    "rationale": "Elongated 12-month sales cycles and custom deployment drag; standardize on cloud SaaS first."
                },
                {
                    "feature_name": "Monolithic Multi-Industry Horizontal Expansion",
                    "rationale": f"Maintain sharp vertical dominance in {industry} before diluting positioning."
                }
            ]
            stack = ["React 18 + Vite", "FastAPI + Python Universal AI Adapter", "PostgreSQL + Redis Cloud"]

        return {
            "mvp_philosophy": (
                f"For '{startup_idea}', the MVP build strategy focuses strictly on solving the primary "
                f"operational bottleneck for {target_market} with zero bloat. By launching the core Must-Have loop "
                f"first, the startup can prove willingness to pay within 30 days while keeping engineering overhead lean."
            ),
            "moscow_matrix": {
                "must_have": must,
                "should_have": should,
                "could_have": could,
                "wont_have_v1": wont
            },
            "sprint_roadmap": {
                "phase_1_30_days": f"Ship the core {must[0]['feature_name']} and frictionless onboarding to onboard the first 50 beta users.",
                "phase_2_60_days": "Introduce should-have integrations, automated reporting, and payment tiering to trigger monetization."
            },
            "estimated_mvp_build_time_weeks": 6,
            "recommended_tech_stack": stack,
            "agent_status": "heuristic_fallback"
        }
