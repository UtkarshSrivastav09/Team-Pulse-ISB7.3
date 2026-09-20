import os
from typing import Dict, Any, List
from services.llm_service import LLMService

class GTMStrategyAgent:
    """
    Milestone 3 Agent 3: Go-To-Market (GTM) Strategy Generation Agent.
    Produces:
    - Strategic value positioning statement & elevator narrative
    - Primary and secondary customer acquisition channels with CAC estimates
    - Tactical 'First 100 Customers' traction playbook
    - Phased 3-stage launch roadmap and monetization tiering
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
        swot_context: dict = None,
        mvp_context: dict = None
    ) -> dict:
        """
        Executes Go-To-Market strategy synthesis.
        """
        market_summary = (market_context or {}).get("market_summary", "")
        customer_segments = (market_context or {}).get("customer_segments", [])
        gaps = (competitor_context or {}).get("market_gaps_and_white_space", [])

        system_instruction = (
            "You are a World-Class Chief Marketing Officer and Venture Growth Strategist. "
            "Develop an aggressive, highly tactical Go-To-Market (GTM) Strategy for an early-stage startup. "
            "Output strictly valid JSON."
        )

        prompt = f"""Generate a tactical Go-To-Market Strategy for this startup:

Startup Concept: "{startup_idea}"
Industry Vertical: "{industry}"
Target Audience: "{target_market}"

Market Background:
{market_summary}

Competitor Gaps to Exploit:
{gaps}

Return a valid JSON object matching this exact schema:
{{
  "gtm_executive_summary": "A 2-sentence summary of the GTM growth engine and primary acquisition flywheel.",
  "positioning_statement": {{
    "for_target": "Specifically who the product is built for",
    "who_struggle_with": "The primary operational or emotional pain point",
    "our_solution_is": "Product category & value proposition",
    "that_delivers": "Key transformation or measurable outcome",
    "unlike_competitors": "Key distinction vs existing alternatives"
  }},
  "acquisition_channels": [
    {{
      "channel_name": "Channel Title (e.g., Vertical Community & Forum Infiltration)",
      "channel_type": "Organic / Paid / Outbound / Partnership / Viral Loop",
      "priority": "Primary / Secondary",
      "estimated_cac": "$15 - $40 per user / customer",
      "tactical_playbook": "Exact 2-3 step execution strategy for this channel.",
      "expected_conversion_rate": "3.5% - 6.0%"
    }},
    {{
      "channel_name": "Second Acquisition Channel Title",
      "channel_type": "Channel category",
      "priority": "Primary / Secondary",
      "estimated_cac": "Estimated CAC range",
      "tactical_playbook": "Exact tactical steps to execute.",
      "expected_conversion_rate": "Percentage range"
    }},
    {{
      "channel_name": "Third Acquisition Channel Title",
      "channel_type": "Channel category",
      "priority": "Secondary",
      "estimated_cac": "Estimated CAC range",
      "tactical_playbook": "Exact tactical steps to execute.",
      "expected_conversion_rate": "Percentage range"
    }}
  ],
  "first_100_customers_playbook": [
    "Step 1: Specific cold outreach or community seeding tactic",
    "Step 2: Interactive demo / free trial incentive to capture initial users",
    "Step 3: User interview & feedback cadence to optimize conversion",
    "Step 4: Referral trigger to double early user acquisition organically"
  ],
  "phased_launch_roadmap": [
    {{
      "phase": "Phase 1: Alpha / Waitlist (Weeks 1-4)",
      "goal": "Capture 200 high-intent waitlist signups and validate core Must-Have loop with 20 design partners.",
      "key_deliverables": ["Interactive Landing Page", "Private Discord/Slack Alpha Community", "Direct Founder Onboarding"]
    }},
    {{
      "phase": "Phase 2: Public Beta & Community Launch (Weeks 5-8)",
      "goal": "Launch on Product Hunt, Hacker News, and targeted niche subreddits to acquire first 500 active users.",
      "key_deliverables": ["Self-Serve Onboarding", "Live Case Studies", "Automated Referral Incentives"]
    }},
    {{
      "phase": "Phase 3: Scale & Monetization (Weeks 9-16)",
      "goal": "Implement paid tiering, activate paid performance channels, and begin outbound B2B expansion.",
      "key_deliverables": ["SaaS Billing Integration", "Enterprise Security Tier", "Paid Inbound Funnel"]
    }}
  ],
  "pricing_and_monetization_strategy": {{
    "model_type": "Freemium / Monthly SaaS / Usage-Based Tiering",
    "starter_tier": "Free / Low-cost tier description & price",
    "growth_tier": "Main monetization tier description & price",
    "enterprise_tier": "High-ticket custom tier description & price",
    "rationale": "Why this pricing model optimizes CAC payback and Net Revenue Retention."
  }}
}}
"""
        # Call LLM
        result = self.llm.generate_structured_json(prompt, system_instruction)
        if result and "positioning_statement" in result and "acquisition_channels" in result:
            result["agent_status"] = "live_llm"
            return result

        # Fallback heuristic generator
        return self._heuristic_fallback(startup_idea, industry, target_market, search_data)

    def _heuristic_fallback(self, startup_idea: str, industry: str, target_market: str, search_data: dict) -> dict:
        """
        Synthesizes robust domain-aware Go-To-Market strategy when LLM API keys are unconfigured.
        """
        lower_idea = startup_idea.lower()
        lower_ind = industry.lower()

        if any(w in lower_ind for w in ["health", "pet", "bio", "med"]):
            target_str = "anxious pet owners and veterinary clinics"
            pain_str = "late-night pet emergencies, exorbitant clinic visit fees, and uncertain symptom triage"
            solution_str = "an instant AI-powered smartphone triage & video telehealth platform"
            delivers_str = "immediate veterinary guidance in <30 seconds and eliminates 60% of unnecessary emergency clinic visits"
            unlike_str = "expensive per-call telehealth platforms and generic symptom forum threads"
            ch1 = {
                "channel_name": "Veterinary Clinic Referral & Waiting Room QR Partnerships",
                "channel_type": "Partnership / Co-Marketing",
                "priority": "Primary",
                "estimated_cac": "$8 - $18 per activated pet owner",
                "tactical_playbook": "Partner with local veterinary clinics to display after-hours triage QR codes in reception areas and on clinic answering machines.",
                "expected_conversion_rate": "8.5% - 14.0%"
            }
            ch2 = {
                "channel_name": "High-Intent Search & Breed-Specific Pet Communities",
                "channel_type": "Organic SEO / Community",
                "priority": "Primary",
                "estimated_cac": "$12 - $25 per user",
                "tactical_playbook": "Publish symptom-specific triage visual guides on TikTok, Instagram Reels, and niche subreddits (r/dogs, r/AskVet).",
                "expected_conversion_rate": "4.2% - 7.0%"
            }
            ch3 = {
                "channel_name": "Pet Insurance & Breeder Onboarding Bundles",
                "channel_type": "B2B2C Channel",
                "priority": "Secondary",
                "estimated_cac": "$20 - $35 per subscriber",
                "tactical_playbook": "Bundle 3 months of free AI triage with pet adoption agencies and pet wellness insurance packages.",
                "expected_conversion_rate": "6.0% - 10.5%"
            }
            t1 = "Free: 3 AI Photo Symptom Scans / month + Basic Urgency Rating"
            t2 = "Pro Pet Care ($14.99/mo): Unlimited AI Triage, 2 Live Vet Video Consults, and Rx Discounts"
            t3 = "Clinic Partner ($199/mo): White-label triage intake widget for veterinary practices"
            first100 = [
                "Partner with 5 local rescue shelters to offer free triage passes to every new pet adopter.",
                "Answer real-time pet health queries on Reddit (r/DogAdvice, r/CatAdvice) with helpful advice and an interactive triage link.",
                "Run a targeted $200 Instagram campaign showcasing side-by-side emergency fee savings ($250 clinic bill vs $0 instant scan).",
                "Introduce a 'Refer a Pet Parent' loop giving 1 month free Pro access for every friend onboarded."
            ]
        elif any(w in lower_ind for w in ["green", "logist", "cargo", "mobility", "transport"]):
            target_str = "urban courier fleets, e-commerce brands, and last-mile delivery operators"
            pain_str = "city congestion charges, high fuel costs, and suboptimal routing for e-cargo bikes"
            solution_str = "an AI-powered cargo-specific navigation and dispatch optimization engine"
            delivers_str = "a 35% reduction in delivery times, 40% fleet battery life extension, and automated carbon offset auditing"
            unlike_str = "car-centric Google Maps and generic fleet telematics software"
            ch1 = {
                "channel_name": "Direct Cold Outbound to Urban Micro-Fulfillment Fleets",
                "channel_type": "Outbound B2B Sales",
                "priority": "Primary",
                "estimated_cac": "$90 - $180 per fleet customer",
                "tactical_playbook": "Target Fleet Operations Directors at Gorillas, Getir, Stuart, and local courier cooperatives with customized route efficiency audits.",
                "expected_conversion_rate": "12.0% - 18.0%"
            }
            ch2 = {
                "channel_name": "E-Cargo Bike Manufacturer OEM Bundling",
                "channel_type": "Strategic OEM Partnerships",
                "priority": "Primary",
                "estimated_cac": "$40 - $70 per commercial rider",
                "tactical_playbook": "Pre-install rider companion apps with leading commercial e-cargo bike manufacturers (Riese & Müller, Tern, Urban Arrow).",
                "expected_conversion_rate": "22.0% - 30.0%"
            }
            ch3 = {
                "channel_name": "Municipal Green Logistics Grants & Low-Emission Zone Directories",
                "channel_type": "Government / Regulatory Alignment",
                "priority": "Secondary",
                "estimated_cac": "$30 - $60 per operator",
                "tactical_playbook": "List as an approved zero-emission logistics routing software on municipal green transition portals in London, Paris, and Amsterdam.",
                "expected_conversion_rate": "7.5% - 11.0%"
            }
            t1 = "Pilot Tier ($0): Up to 3 active bikes + basic elevation routing"
            t2 = "Fleet Pro ($29/bike/mo): Dynamic dispatch, battery telemetry, and Shopify order auto-batching"
            t3 = "Enterprise Logistics ($499+/mo): Dedicated API integrations, custom micro-hub routing, and ESG carbon audits"
            first100 = [
                "Conduct free 1-week route audits for 15 local courier companies in London/Berlin to prove 30% time savings.",
                "Demo live side-by-side bike lane vs gridlock navigation at European Micro-Mobility Expos.",
                "Offer a risk-free 30-day trial with guaranteed 15% courier wage productivity improvement.",
                "Host an urban green logistics webinar highlighting upcoming low-emission zone penalty deadlines."
            ]
        elif any(w in lower_ind for w in ["edtech", "educat", "learn", "study"]):
            target_str = "university students and competitive exam test-takers"
            pain_str = "overwhelming lecture volumes, dense textbooks, and ineffective passive studying"
            solution_str = "an AI learning copilot that converts lectures and PDFs into active recall flashcards & mock exams"
            delivers_str = "a 2x reduction in study time and a measurable 15-20% boost in test scores"
            unlike_str = "generic AI chat tools and static flashcard libraries like Quizlet"
            ch1 = {
                "channel_name": "Campus Ambassador Programs & Student Discord / WhatsApp Seeding",
                "channel_type": "Viral Student Loops",
                "priority": "Primary",
                "estimated_cac": "$4 - $9 per active student",
                "tactical_playbook": "Recruit 20 influential STEM campus ambassadors across top universities to demo live lecture-to-quiz generation before midterm exams.",
                "expected_conversion_rate": "15.0% - 25.0%"
            }
            ch2 = {
                "channel_name": "TikTok & YouTube Shorts 'Study With Me' Virality",
                "channel_type": "Organic Short-Form Video",
                "priority": "Primary",
                "estimated_cac": "$2 - $6 per sign-up",
                "tactical_playbook": "Create authentic 15-second study hacks showing an entire 80-page bio chapter turned into a mock test in 5 seconds.",
                "expected_conversion_rate": "6.0% - 11.0%"
            }
            ch3 = {
                "channel_name": "University Department & Professor Course Pack Partnerships",
                "channel_type": "Institutional B2B",
                "priority": "Secondary",
                "estimated_cac": "$50 - $120 per department",
                "tactical_playbook": "Provide teaching assistants with free automated quiz generators in exchange for recommending the platform on course syllabi.",
                "expected_conversion_rate": "18.0% - 28.0%"
            }
            t1 = "Free Starter: Ingest 3 PDFs / month + 100 Flashcards"
            t2 = "Student Scholar ($9.99/mo): Unlimited Lecture Ingestion, Mock Exams, and LMS Sync"
            t3 = "Campus / Department ($499/term): Department-wide student licenses and analytics"
            first100 = [
                "Seed free customized mock exam decks into university Reddit pages 2 weeks before midterms.",
                "Offer free Semester-Pass upgrades to any student who invites 3 classmates to their study group.",
                "Run a TikTok 'Final Exam Survival Challenge' showing speed study workflows.",
                "Partner with 3 university STEM student societies to sponsor their exam review workshops."
            ]
        else:
            target_str = f"growth-focused professionals and operators in {target_market}"
            pain_str = f"fragmented manual workflows and high operating overhead across {industry}"
            solution_str = f"a specialized automated platform tailored specifically for {industry}"
            delivers_str = "a 10x workflow acceleration and measurable cost reductions within 30 days"
            unlike_str = "clunky legacy software and generic non-specialized alternatives"
            ch1 = {
                "channel_name": f"High-Intent Inbound Content & Domain SEO for {industry}",
                "channel_type": "Organic Search",
                "priority": "Primary",
                "estimated_cac": "$25 - $50 per customer",
                "tactical_playbook": f"Publish high-value tactical teardowns and ROI calculator templates addressing core {industry} bottlenecks.",
                "expected_conversion_rate": "3.5% - 6.5%"
            }
            ch2 = {
                "channel_name": f"Targeted LinkedIn & Cold Email Outbound to {target_market}",
                "channel_type": "Outbound B2B",
                "priority": "Primary",
                "estimated_cac": "$60 - $120 per qualified lead",
                "tactical_playbook": f"Execute personalized outreach offering a free workflow efficiency benchmark audit to team leads in {industry}.",
                "expected_conversion_rate": "8.0% - 14.0%"
            }
            ch3 = {
                "channel_name": "Strategic Integration & Marketplace Listings",
                "channel_type": "Ecosystem Partnerships",
                "priority": "Secondary",
                "estimated_cac": "$30 - $70 per account",
                "tactical_playbook": "Build native app store connectors for dominant ecosystem tools to capture high-intent users looking for integrations.",
                "expected_conversion_rate": "5.0% - 9.0%"
            }
            t1 = "Starter / Self-Serve ($19/mo): Core workflow automation + single user"
            t2 = "Team Pro ($79/mo): Multi-user collaboration, automated reporting, and priority support"
            t3 = "Enterprise Custom ($299+/mo): Custom integrations, dedicated account manager, and SLA guarantees"
            first100 = [
                f"Directly message 50 high-profile operators in {target_market} with a personalized video demo of their workflow.",
                "Launch on Product Hunt and relevant industry directories with a special lifetime beta discount.",
                "Publish a comprehensive state-of-the-industry benchmark report to attract organic media mentions.",
                "Incentivize early adopters with 3 months free in exchange for a detailed public case study."
            ]

        return {
            "gtm_executive_summary": (
                f"The Go-To-Market playbook for '{startup_idea}' focuses on a high-velocity product-led growth (PLG) "
                f"flywheel combined with targeted outbound partnerships. By exploiting competitor white spaces, the startup "
                f"can secure initial market dominance in {industry} with CAC payback < 3.5 months."
            ),
            "positioning_statement": {
                "for_target": target_str,
                "who_struggle_with": pain_str,
                "our_solution_is": solution_str,
                "that_delivers": delivers_str,
                "unlike_competitors": unlike_str
            },
            "acquisition_channels": [ch1, ch2, ch3],
            "first_100_customers_playbook": first100,
            "phased_launch_roadmap": [
                {
                    "phase": "Phase 1: Alpha / Waitlist (Weeks 1-4)",
                    "goal": f"Capture 250 high-intent waitlist signups and validate core Must-Have loop with 15 {target_market} design partners.",
                    "key_deliverables": ["Interactive Landing Page", "Private Alpha Community", "Direct Founder Onboarding Calls"]
                },
                {
                    "phase": "Phase 2: Public Beta & Community Launch (Weeks 5-8)",
                    "goal": f"Launch across Product Hunt and niche {industry} forums to onboard the first 500 active users.",
                    "key_deliverables": ["Self-Serve Onboarding Flow", "Initial Customer Case Studies", "Automated Referral Incentives"]
                },
                {
                    "phase": "Phase 3: Scale & Monetization (Weeks 9-16)",
                    "goal": "Activate paid performance acquisition channels, introduce tiered pricing, and initiate outbound B2B sales.",
                    "key_deliverables": ["Stripe Billing Integration", "Enterprise Security Tier", "Outbound B2B Pipeline"]
                }
            ],
            "pricing_and_monetization_strategy": {
                "model_type": "Tiered SaaS Subscription with 14-Day Free Evaluation",
                "starter_tier": t1,
                "growth_tier": t2,
                "enterprise_tier": t3,
                "rationale": "Enables zero-friction bottom-up adoption by individual users while providing a clear monetization ladder to high-ACV enterprise contracts."
            },
            "agent_status": "heuristic_fallback"
        }
