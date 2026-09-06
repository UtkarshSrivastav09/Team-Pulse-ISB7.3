"""
Schemas for normalized Tavily search results.

These are the predictable, structured records that the Web Search Agent
produces and that the Market / Competitor agents consume. Keeping this
normalized means we never pass raw Tavily JSON deeper into the pipeline.
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class SearchResultItem(BaseModel):
    """A single normalized search result."""

    query: str = Field(..., description="The query that produced this result")
    category: str = Field(
        ..., description="Research category, e.g. 'market_size', 'competitors'"
    )
    title: str = ""
    url: str = ""
    content: str = Field("", description="Snippet/content trimmed for LLM use")
    source: str = Field("", description="Domain or publication name")
    published_date: Optional[str] = None
    relevance_score: float = 0.0


class ResearchPacket(BaseModel):
    """
    The full, deduplicated research bundle handed off to the analysis agents.
    This is intentionally compact -- only what's needed for reasoning.
    """

    startup_idea: str
    target_market: Optional[str] = None
    industry: Optional[str] = None

    results: List[SearchResultItem] = Field(default_factory=list)
    results_by_category: dict = Field(
        default_factory=dict,
        description="category -> list[SearchResultItem] for quick agent access",
    )

    total_queries_run: int = 0
    total_results_collected: int = 0
    used_sandbox_mode: bool = False
    warnings: List[str] = Field(default_factory=list)
