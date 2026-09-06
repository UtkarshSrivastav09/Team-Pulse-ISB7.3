"""
LangGraph orchestration for the startup validation pipeline.

Pipeline (section 23/25 of the plan):

    START -> input validation -> web_search -> market_analysis
          -> competitor_analysis -> quality_check -> final_report -> END

LangGraph only controls execution order / state handoff / error handling.
All reasoning happens in the agents; all deterministic checks happen here
in plain Python (keeps the Claude free-tier budget at ~2 calls/run).
"""

import logging
from typing import List, Optional, TypedDict

from langgraph.graph import StateGraph, END

from agents.web_search_agent import web_search_node
from agents.market_agent import market_analysis_node
from agents.competitor_agent import competitor_analysis_node

from schemas.market_schema import MarketAnalysis, NOT_FOUND
from schemas.competitor_schema import CompetitorAnalysis
from schemas.final_report_schema import FinalReport, QualityCheckResult, SourceEntry

logger = logging.getLogger("startup_validation_graph")


class StartupState(TypedDict, total=False):
    startup_idea: str
    target_market: str
    industry: str

    search_results: dict
    market_analysis: dict
    competitor_analysis: dict

    final_report: dict
    errors: List[str]


# ----------------------------------------------------------------------
# Input validation node
# ----------------------------------------------------------------------
def input_validation_node(state: StartupState) -> StartupState:
    idea = (state.get("startup_idea") or "").strip()
    errors = list(state.get("errors", []))
    if not idea:
        errors.append("startup_idea is required.")
    return {**state, "startup_idea": idea, "errors": errors}


# ----------------------------------------------------------------------
# Quality check node (Python, not an LLM call -- section 36)
# ----------------------------------------------------------------------
def quality_check_node(state: StartupState) -> StartupState:
    market = MarketAnalysis.model_validate(state.get("market_analysis") or {})
    competitor = CompetitorAnalysis.model_validate(state.get("competitor_analysis") or {})

    passed: List[str] = []
    warnings: List[str] = []

    if market.market_size.value and market.market_size.value != NOT_FOUND:
        if market.market_size.url:
            passed.append("Market size has source evidence.")
        else:
            warnings.append("Market size is present but missing a source URL.")

    if market.growth.cagr and market.growth.cagr != NOT_FOUND:
        passed.append("Growth/CAGR figure present.")

    if competitor.competitors:
        unsupported = [c.name for c in competitor.competitors if not c.sources]
        if unsupported:
            warnings.append(f"Competitors without source attribution: {', '.join(unsupported)}")
        else:
            passed.append("All competitors have source attribution.")

        names = [c.name.strip().lower() for c in competitor.competitors]
        if len(names) != len(set(names)):
            warnings.append("Duplicate competitor names detected.")
        else:
            passed.append("No duplicate competitors.")
    else:
        warnings.append("No competitors were identified from available research.")

    if not market.customer_segments:
        warnings.append("No specific customer segments were identified.")
    else:
        passed.append("Customer segments identified.")

    return {
        **state,
        "_quality_check": QualityCheckResult(passed_checks=passed, warnings=warnings).dict(),
    }


# ----------------------------------------------------------------------
# Final report assembly node (Python, not a 3rd LLM call -- section 40)
# ----------------------------------------------------------------------
def _build_executive_summary(idea: str, market: MarketAnalysis, competitor: CompetitorAnalysis) -> str:
    segment_count = len(market.customer_segments)
    competitor_count = len(competitor.competitors)
    gap_count = len(competitor.market_gaps)

    size_bit = (
        f"Market size evidence found ({market.market_size.value} {market.market_size.currency})."
        if market.market_size.value and market.market_size.value != NOT_FOUND
        else "No reliable market-size figure was found in available sources."
    )

    return (
        f"Analysis for '{idea}': {size_bit} "
        f"{segment_count} customer segment(s) and {competitor_count} competitor(s) "
        f"were identified from available research, surfacing {gap_count} potential "
        f"market gap(s). Review the sections below for full detail and source evidence."
    )


def _collect_sources(market: MarketAnalysis, competitor: CompetitorAnalysis, search_results: dict) -> List[SourceEntry]:
    seen = set()
    sources: List[SourceEntry] = []

    for s in market.sources:
        if s.url and s.url not in seen:
            seen.add(s.url)
            sources.append(SourceEntry(title=s.claim, url=s.url, source=s.source))

    for c in competitor.competitors:
        for url in c.sources:
            if url and url not in seen:
                seen.add(url)
                sources.append(SourceEntry(title=f"Reference for {c.name}", url=url))

    for r in (search_results or {}).get("results", []):
        url = r.get("url")
        if url and url not in seen:
            seen.add(url)
            sources.append(SourceEntry(title=r.get("title", ""), url=url, source=r.get("source", "")))

    return sources


def final_report_node(state: StartupState) -> StartupState:
    market = MarketAnalysis.model_validate(state.get("market_analysis") or {})
    competitor = CompetitorAnalysis.model_validate(state.get("competitor_analysis") or {})
    quality_check = QualityCheckResult.model_validate(state.get("_quality_check") or {})

    report = FinalReport(
        startup_idea=state.get("startup_idea", ""),
        target_market=state.get("target_market", "") or "",
        industry=state.get("industry", "") or "",
        executive_summary=_build_executive_summary(state.get("startup_idea", ""), market, competitor),
        market_analysis=market,
        competitor_analysis=competitor,
        quality_check=quality_check,
        sources=_collect_sources(market, competitor, state.get("search_results") or {}),
        errors=state.get("errors", []),
        used_sandbox_mode=(state.get("search_results") or {}).get("used_sandbox_mode", False),
    )

    logger.info("[FINAL] Report generated for '%s'.", state.get("startup_idea"))

    return {**state, "final_report": report.dict()}


# ----------------------------------------------------------------------
# Graph construction
# ----------------------------------------------------------------------
def build_graph():
    graph = StateGraph(StartupState)

    graph.add_node("input_validation", input_validation_node)
    graph.add_node("web_search", web_search_node)
    graph.add_node("market_analysis", market_analysis_node)
    graph.add_node("competitor_analysis", competitor_analysis_node)
    graph.add_node("quality_check", quality_check_node)
    graph.add_node("final_report", final_report_node)

    graph.set_entry_point("input_validation")
    graph.add_edge("input_validation", "web_search")
    graph.add_edge("web_search", "market_analysis")
    graph.add_edge("market_analysis", "competitor_analysis")
    graph.add_edge("competitor_analysis", "quality_check")
    graph.add_edge("quality_check", "final_report")
    graph.add_edge("final_report", END)

    return graph.compile()


# Compiled once at import time; reused across requests.
startup_validation_graph = build_graph()


def run_validation(startup_idea: str, target_market: Optional[str] = None, industry: Optional[str] = None) -> dict:
    """Convenience entrypoint used by the FastAPI route."""
    initial_state: StartupState = {
        "startup_idea": startup_idea,
        "target_market": target_market or "",
        "industry": industry or "",
        "errors": [],
    }
    result_state = startup_validation_graph.invoke(initial_state)
    return result_state["final_report"]
