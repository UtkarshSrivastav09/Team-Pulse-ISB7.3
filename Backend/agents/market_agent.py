"""
Market Analysis Agent -- LangGraph node.

startup_idea + search_results -> market_analysis
"""

import logging
from schemas.search_schema import ResearchPacket
from services.market_analysis_service import run_market_analysis

logger = logging.getLogger("market_agent")


def market_analysis_node(state: dict) -> dict:
    packet = ResearchPacket.model_validate(state["search_results"])
    analysis = run_market_analysis(packet)

    errors = list(state.get("errors", []))
    if analysis.error:
        errors.append(f"Market analysis failed: {analysis.error}")

    return {
        **state,
        "market_analysis": analysis.dict(),
        "errors": errors,
    }
