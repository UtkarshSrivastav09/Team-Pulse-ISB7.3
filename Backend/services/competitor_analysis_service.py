"""
Competitor Analysis Service: the second LLM reasoning call (Claude Call 2)
that turns the research packet into a structured CompetitorAnalysis.
"""

import logging
from typing import List

from schemas.search_schema import ResearchPacket, SearchResultItem
from schemas.competitor_schema import CompetitorAnalysis
from prompts.competitor_prompt import COMPETITOR_SYSTEM_PROMPT, build_competitor_prompt
from services.llm_client import call_llm_json

logger = logging.getLogger("competitor_analysis_service")

RELEVANT_CATEGORIES = [
    "competitors",
    "competitor_pricing",
    "competitor_features",
    "competitor_reviews",
    "industry_trends",
    "industry_news",
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


def run_competitor_analysis(packet: ResearchPacket) -> CompetitorAnalysis:
    """
    Filters the research packet down to competitor-relevant categories,
    calls Claude once, and validates the response against CompetitorAnalysis.
    Never raises -- returns a CompetitorAnalysis with `.error` set on failure
    so the pipeline can return a partial report (section 37 of the plan).
    """
    relevant_results = [
        r for r in packet.results if r.category in RELEVANT_CATEGORIES
    ] or packet.results

    research_block = _format_research_block(relevant_results)

    user_prompt = build_competitor_prompt(
        startup_idea=packet.startup_idea,
        target_market=packet.target_market or "",
        industry=packet.industry or "",
        research_block=research_block,
    )

    try:
        raw = call_llm_json(COMPETITOR_SYSTEM_PROMPT, user_prompt)
        analysis = CompetitorAnalysis.model_validate(raw)
        logger.info("[COMPETITOR] %d competitors identified.", len(analysis.competitors))
        return analysis
    except Exception as exc:  # noqa: BLE001
        logger.error("[COMPETITOR] Competitor analysis failed: %s", exc)
        return CompetitorAnalysis(error=str(exc))
