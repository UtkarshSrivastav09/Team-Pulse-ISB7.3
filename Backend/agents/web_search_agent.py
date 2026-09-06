"""
Web Search Agent -- LangGraph node.

startup_idea -> search_results (ResearchPacket)
"""

import logging
from services.search_service import SearchService

logger = logging.getLogger("web_search_agent")

_search_service = SearchService()


def web_search_node(state: dict) -> dict:
    logger.info("[INPUT] Startup idea received: %s", state.get("startup_idea"))

    packet = _search_service.run_targeted_research(
        startup_idea=state["startup_idea"],
        target_market=state.get("target_market"),
        industry=state.get("industry"),
    )

    logger.info(
        "[SEARCH] %d research results collected (sandbox=%s).",
        packet.total_results_collected,
        packet.used_sandbox_mode,
    )

    errors = list(state.get("errors", []))
    if packet.total_results_collected == 0:
        errors.append("Insufficient research data: no useful search results were found.")

    return {
        **state,
        "search_results": packet.dict(),
        "errors": errors,
    }
