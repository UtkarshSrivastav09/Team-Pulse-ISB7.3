"""
Market Analysis Service: the single LLM reasoning call (Claude Call 1)
that turns the research packet into a structured MarketAnalysis.
"""

import logging
from typing import List

from schemas.search_schema import ResearchPacket, SearchResultItem
from schemas.market_schema import MarketAnalysis
from prompts.market_prompt import MARKET_SYSTEM_PROMPT, build_market_prompt
from services.llm_client import call_llm_json

logger = logging.getLogger("market_analysis_service")

RELEVANT_CATEGORIES = [
    "market_size",
    "market_growth",
    "market_demand",
    "customer_segments",
    "customer_pain_points",
    "customer_behaviour",
    "industry_trends",
    "industry_news",
    "funding_activity",
]


def _format_research_block(results: List[SearchResultItem]) -> str:
    lines = []
    for i, r in enumerate(results, start=1):
        lines.append(
            f"{i}. [{r.category}] {r.title}\n"
            f"   Source: {r.source} | URL: {r.url}\n"
            f"   Snippet: {r.content}"
        )
    return "\n".join(lines) if lines else "No research results were found."


def run_market_analysis(packet: ResearchPacket) -> MarketAnalysis:
    """
    Filters the research packet down to market/customer-relevant categories,
    calls Claude once, and validates the response against MarketAnalysis.
    Never raises -- returns a MarketAnalysis with `.error` set on failure so
    the pipeline can continue (section 37 of the plan).
    """
    relevant_results = [
        r for r in packet.results if r.category in RELEVANT_CATEGORIES
    ] or packet.results  # fall back to everything if filtering left nothing

    research_block = _format_research_block(relevant_results)

    user_prompt = build_market_prompt(
        startup_idea=packet.startup_idea,
        target_market=packet.target_market or "",
        industry=packet.industry or "",
        research_block=research_block,
    )

    try:
        raw = call_llm_json(MARKET_SYSTEM_PROMPT, user_prompt)
        analysis = MarketAnalysis.model_validate(raw)
        logger.info("[MARKET] Market analysis completed.")
        return analysis
    except Exception as exc:  # noqa: BLE001
        logger.error("[MARKET] Market analysis failed: %s", exc)
        return MarketAnalysis(
            market_summary="Market analysis could not be generated.",
            error=str(exc),
        )
