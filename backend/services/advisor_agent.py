import os
import json
from typing import Dict, Any, List, Optional
from services.llm_service import LLMService

class ConversationalAdvisorAgent:
    """
    Milestone 3 Agent 4: Conversational Startup Advisor Agent.
    Allows founders to engage in context-aware multi-turn consultation regarding their
    validated startup concept, market sizing, risk mitigations, MVP roadmap, GTM playbooks, and pricing.
    """
    def __init__(self, llm_service: LLMService = None):
        self.llm = llm_service or LLMService()

    def chat(
        self,
        user_message: str,
        history: List[Dict[str, str]],
        validation_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Processes a user question within the context of the validated startup concept.
        Returns the advisor reply and suggested follow-up questions.
        """
        startup_idea = validation_context.get("startup_idea", "Early-Stage Startup")
        industry = validation_context.get("industry", "Technology")
        target_market = validation_context.get("target_market", "Target Customers")

        # Extract structured context highlights
        market_analysis = validation_context.get("market_analysis", {})
        competitor_analysis = validation_context.get("competitor_analysis", {})
        swot_analysis = validation_context.get("swot_analysis", {})
        mvp_roadmap = validation_context.get("mvp_roadmap", {})
        gtm_strategy = validation_context.get("gtm_strategy", {})

        tam = market_analysis.get("market_size_and_growth", {}).get("tam_estimate", "N/A")
        cagr = market_analysis.get("market_size_and_growth", {}).get("cagr_growth_rate", "N/A")
        gaps = competitor_analysis.get("market_gaps_and_white_space", [])
        must_haves = [f.get("feature_name") for f in mvp_roadmap.get("moscow_matrix", {}).get("must_have", [])]

        system_instruction = (
            "You are VenturePulse AI, an elite Silicon Valley Venture Capitalist, Product Strategist, and Startup Mentor. "
            "You are consulting directly with a startup founder on their validated idea. "
            "Provide hyper-specific, actionable, data-driven advice based on the validation context. "
            "Structure your answers with clean formatting, bullet points, and high strategic depth. "
            "Avoid generic fluff. Provide real numbers, tactics, and operational frameworks."
        )

        context_summary = f"""
=== VALIDATED STARTUP DOSSIER ===
Idea: "{startup_idea}"
Industry: "{industry}" | Target Audience: "{target_market}"
Market Sizing: TAM {tam} | Growth Rate: {cagr}
Identified Market Gaps: {gaps}
Core MVP Must-Haves: {must_haves}
Pricing Model: {gtm_strategy.get('pricing_and_monetization_strategy', {}).get('model_type', 'SaaS')}
=================================
"""

        # Format messages for LLM
        messages = []
        # Add context as first system/user exchange
        messages.append({"role": "user", "content": f"Here is my validated startup concept dossier:\n{context_summary}\n\nPlease advise me on my questions."})
        messages.append({"role": "assistant", "content": "I have fully analyzed your startup dossier, market sizing, competitor white-spaces, and MVP roadmap. How can I help you execute and win this market?"})

        # Append previous conversation history
        for msg in history[-6:]: # Keep last 6 turns for prompt efficiency
            role = msg.get("role", "user")
            content = msg.get("content") or msg.get("text", "")
            if content:
                messages.append({"role": role, "content": content})

        # Append current user message
        messages.append({"role": "user", "content": user_message})

        # Try generating via LLM text chat
        llm_reply = self.llm.generate_text_response(messages, system_instruction)
        if llm_reply:
            follow_ups = self._generate_follow_up_suggestions(user_message, industry)
            return {
                "reply": llm_reply,
                "suggested_follow_ups": follow_ups,
                "agent_status": "live_llm"
            }

        # Fallback intelligent heuristic advisor response
        return self._heuristic_chat_fallback(user_message, startup_idea, industry, target_market, validation_context)

    def _generate_follow_up_suggestions(self, query: str, industry: str) -> List[str]:
        """Generates dynamic follow-up prompts."""
        q_lower = query.lower()
        if "price" in q_lower or "cost" in q_lower or "monetiz" in q_lower:
            return [
                "What is the estimated CAC-to-LTV ratio for this pricing model?",
                "How can I package an enterprise pilot contract for early adopters?",
                "Should I offer an annual discount upfront to boost runway?"
            ]
        elif "gtm" in q_lower or "channel" in q_lower or "acqui" in q_lower:
            return [
                "How do I structure a referral loop to turn early users into advocates?",
                "What are the best cold outbound email templates for this audience?",
                "How much should I allocate to paid ad testing in Month 1?"
            ]
        elif "mvp" in q_lower or "feature" in q_lower or "build" in q_lower:
            return [
                "What tech stack will allow me to build this MVP in under 4 weeks?",
                "Which feature should I drop if my sprint falls behind schedule?",
                "How should I measure product-market fit after launching the MVP?"
            ]
        else:
            return [
                "How do we defensibly protect against Big Tech entering this space?",
                "What key metrics will Seed / Series A investors look for in 6 months?",
                "How should I structure my first 30-day go-to-market sprint?"
            ]

    def _heuristic_chat_fallback(
        self,
        user_message: str,
        startup_idea: str,
        industry: str,
        target_market: str,
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Produces domain-aware consulting advice when LLM keys are offline.
        """
        msg_lower = user_message.lower()

        if any(w in msg_lower for w in ["price", "pricing", "cost", "monetiz", "revenue", "charge"]):
            reply = (
                f"### 💡 Optimized Pricing & Monetization Strategy for {industry}\n\n"
                f"To maximize Year-1 ARR while keeping CAC payback under 4 months for **{target_market}**, here is the recommended 3-tier structure:\n\n"
                f"1. **Starter / Self-Serve Tier ($19 - $29/mo)**:\n"
                f"   - **Target**: Individual operators and early adopters.\n"
                f"   - **Value metric**: 1 active seat, core automated workflow, up to 100 tasks/month.\n"
                f"   - **Strategy**: Low friction self-serve signup with a 14-day reverse trial.\n\n"
                f"2. **Professional / Team Tier ($79 - $149/mo)** *(Primary Growth Driver)*:\n"
                f"   - **Target**: Small businesses and teams needing multi-user collaboration and integrations.\n"
                f"   - **Value metric**: Up to 5 team seats, unlimited automated workflows, custom export reports.\n"
                f"   - **Strategy**: Target 65%+ of your customer base on this tier with annual 20% prepayment discount.\n\n"
                f"3. **Enterprise Tier ($499+/mo Custom)**:\n"
                f"   - **Target**: Regional clinics, fleet operators, and institutional buyers in {industry}.\n"
                f"   - **Value metric**: Dedicated account manager, custom API connectors, and SLA guarantees.\n\n"
                f"**Founder Takeaway**: Don't price too low. Early B2B customers associate ultra-cheap pricing with low reliability."
            )
            follow_ups = [
                "What is the estimated CAC-to-LTV ratio for this pricing model?",
                "How do I close my first annual upfront prepayment contract?",
                "What should be included in the free tier vs paid tiers?"
            ]
        elif any(w in msg_lower for w in ["gtm", "channel", "acqui", "first 100", "market", "launch", "traction"]):
            reply = (
                f"### 🚀 High-Velocity Go-To-Market & First 100 Users Playbook\n\n"
                f"For **'{startup_idea}'**, relying purely on broad social media ads will burn cash. Instead, execute this 3-step targeted flywheel:\n\n"
                f"1. **Targeted Outbound & Direct Community Seeding (Days 1-15)**:\n"
                f"   - Identify 50 active professionals in **{target_market}** via LinkedIn and niche communities.\n"
                f"   - Offer a free 1-on-1 workflow audit. Position it as: *'We built an automated tool for {industry} and want 15 minutes of your feedback in exchange for 6 months free access.'*\n\n"
                f"2. **Frictionless Interactive Demonstration (Days 16-30)**:\n"
                f"   - Allow prospective users to experience the value in <30 seconds without creating an account first.\n"
                f"   - Implement a shareable output or benchmark report that users naturally post to peers.\n\n"
                f"3. **Viral Referral Incentives (Days 31-60)**:\n"
                f"   - Give existing active users $50 in account credits or free premium features when they invite a colleague in {industry}.\n\n"
                f"**Expected CAC**: $18 - $45 in the early phase, scaling down as organic word-of-mouth compounds."
            )
            follow_ups = [
                "How do I structure a cold outreach message that gets a 30%+ response rate?",
                "Which specific online communities should I target for this concept?",
                "How do I turn beta testers into paying customers upon launch?"
            ]
        elif any(w in msg_lower for w in ["defense", "defensib", "big tech", "google", "moat", "protect", "competitor"]):
            reply = (
                f"### 🛡️ Defensibility & Moat Strategy against Incumbents\n\n"
                f"When building in **{industry}**, large tech giants (Google, OpenAI) provide general models, but they lack **vertical domain execution**. Here is how to build an unassailable moat:\n\n"
                f"1. **Workflow Integration Moat**:\n"
                f"   - Embed deeply into the daily operational habits of {target_market}. Once your tool manages their data schemas and exports, switching cost becomes painful.\n\n"
                f"2. **Proprietary Fine-Tuned Data & Telemetry**:\n"
                f"   - Capture domain-specific feedback and edge cases that general models fail at. Use this proprietary corpus to tune specialized routing.\n\n"
                f"3. **High-Touch Speed & Customer Delight**:\n"
                f"   - Foundation model providers cannot provide dedicated customer support or custom workflow adaptations for {industry}.\n\n"
                f"**Summary**: Compete on domain specialization and workflow ergonomics, never on raw model parameters alone."
            )
            follow_ups = [
                "How do I explain my moat to Seed and Series A investors?",
                "What proprietary data can I start capturing from day one?",
                "How can I partner with existing industry players to block competitors?"
            ]
        else:
            reply = (
                f"### 🎯 Strategic Advisory for '{startup_idea}'\n\n"
                f"Regarding your inquiry on **{user_message}**:\n\n"
                f"1. **Core Strategic Alignment**: Focus immediately on the primary pain point of **{target_market}**. In the {industry} sector, early customer acquisition speed is the #1 predictor of venture success.\n\n"
                f"2. **Execution Priority**: Keep the initial MVP scope strictly confined to the Must-Have features. Validate user retention and weekly engagement before investing in secondary bells and whistles.\n\n"
                f"3. **Financial Discipline**: Aim for a target CAC payback period of under 4 months and ensure unit economics show gross margins > 75%.\n\n"
                f"Would you like to drill down into unit economics, competitor positioning, or go-to-market launch tactics next?"
            )
            follow_ups = [
                "How should I price this to maximize Year-1 ARR?",
                "What is the best GTM channel to acquire the first 100 users?",
                "How do we defensibly protect against Big Tech foundation models?"
            ]

        return {
            "reply": reply,
            "suggested_follow_ups": follow_ups,
            "agent_status": "heuristic_fallback"
        }
