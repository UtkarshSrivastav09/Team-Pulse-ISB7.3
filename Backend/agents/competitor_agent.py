"""
Competitor Analysis Agent -- LangGraph node.

startup_idea + search_results -> competitor_analysis
"""

import logging
from schemas.search_schema import ResearchPacket
from services.competitor_analysis_service import run_competitor_analysis

logger = logging.getLogger("competitor_agent")


def competitor_analysis_node(state: dict) -> dict:
    packet = ResearchPacket.model_validate(state["search_results"])
    analysis = run_competitor_analysis(packet)

    errors = list(state.get("errors", []))
    if analysis.error:
        errors.append(f"Competitor analysis failed: {analysis.error}")
    else:
        logger.info("[COMPETITOR] %d potential competitors identified.", len(analysis.competitors))

    return {
        **state,
        "competitor_analysis": analysis.dict(),
        "errors": errors,
    }
