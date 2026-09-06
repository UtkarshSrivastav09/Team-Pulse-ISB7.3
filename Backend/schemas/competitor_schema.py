"""
Schema for the Competitor Discovery & Comparison Agent output.
Mirrors section 18 of the Milestone 2 plan.
"""

from typing import List, Literal, Optional
from pydantic import BaseModel, Field

CompetitorType = Literal["direct", "indirect", "new_entrant"]


class Competitor(BaseModel):
    name: str
    type: CompetitorType = "direct"
    offering: str = ""
    target_customer: str = ""
    pricing: str = "Not found in available sources."
    features: List[str] = Field(default_factory=list)
    business_model: str = ""
    positioning: str = ""
    strengths: List[str] = Field(default_factory=list)
    weaknesses: List[str] = Field(default_factory=list)
    customer_complaints: List[str] = Field(default_factory=list)
    sources: List[str] = Field(default_factory=list)


class CompetitorAnalysis(BaseModel):
    competitors: List[Competitor] = Field(default_factory=list)
    market_gaps: List[str] = Field(default_factory=list)
    differentiation_opportunities: List[str] = Field(default_factory=list)

    # Set by the pipeline, not the LLM, if the agent call itself fails
    error: Optional[str] = None
