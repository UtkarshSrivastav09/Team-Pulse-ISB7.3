"""
Schema for the final report returned to the frontend.

Per the plan (section 40), this is assembled by plain Python from the
Market and Competitor agent outputs -- no third LLM call.
"""

from typing import List
from pydantic import BaseModel, Field

from schemas.market_schema import MarketAnalysis
from schemas.competitor_schema import CompetitorAnalysis


class QualityCheckResult(BaseModel):
    passed_checks: List[str] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)


class SourceEntry(BaseModel):
    title: str = ""
    url: str
    source: str = ""


class FinalReport(BaseModel):
    startup_idea: str
    target_market: str = ""
    industry: str = ""

    executive_summary: str = ""

    market_analysis: MarketAnalysis
    competitor_analysis: CompetitorAnalysis

    quality_check: QualityCheckResult = Field(default_factory=QualityCheckResult)
    sources: List[SourceEntry] = Field(default_factory=list)

    errors: List[str] = Field(default_factory=list)
    used_sandbox_mode: bool = False
