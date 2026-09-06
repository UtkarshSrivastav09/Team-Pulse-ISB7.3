"""
Schema for the Market Opportunity & Customer Segmentation Agent output.

Mirrors the structure specified in the Milestone 2 plan (section 14).
`NOT_FOUND` is used everywhere instead of inventing a value.
"""

from typing import List, Optional
from pydantic import BaseModel, Field

NOT_FOUND = "Not found in available sources."


class MarketSize(BaseModel):
    value: str = NOT_FOUND
    currency: str = ""
    year: str = ""
    geography: str = ""
    scope: str = ""  # global / regional / niche
    source: str = ""
    url: str = ""


class Growth(BaseModel):
    cagr: str = NOT_FOUND
    period: str = ""
    trend: str = ""  # e.g. "growing", "stable", "declining", "unclear"


class CustomerSegment(BaseModel):
    segment: str
    needs: List[str] = Field(default_factory=list)
    pain_points: List[str] = Field(default_factory=list)
    motivations: List[str] = Field(default_factory=list)


class SourceRef(BaseModel):
    claim: str
    url: str = ""
    source: str = ""


class MarketAnalysis(BaseModel):
    market_summary: str = ""
    market_size: MarketSize = Field(default_factory=MarketSize)
    growth: Growth = Field(default_factory=Growth)

    demand_signals: List[str] = Field(default_factory=list)
    customer_segments: List[CustomerSegment] = Field(default_factory=list)
    pain_points: List[str] = Field(default_factory=list)
    motivations: List[str] = Field(default_factory=list)
    buying_behavior: List[str] = Field(default_factory=list)

    industry_terms: List[str] = Field(default_factory=list)
    industry_trends: List[str] = Field(default_factory=list)

    sources: List[SourceRef] = Field(default_factory=list)

    # Set by the pipeline, not the LLM, if the agent call itself fails
    error: Optional[str] = None
