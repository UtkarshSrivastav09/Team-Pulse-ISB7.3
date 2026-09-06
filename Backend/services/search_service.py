import os
from typing import Dict, List, Optional

from tavily import TavilyClient

from schemas.search_schema import SearchResultItem, ResearchPacket

# Milestone 2: research categories -> query template. {idea} is substituted
# with the startup idea (optionally combined with target_market/industry).
# Targeted per-category queries produce more focused evidence than one
# broad combined query (see get_market_data below, which is kept for the
# legacy /search route).
QUERY_TEMPLATES: Dict[str, str] = {
    "market_size": "{idea} market size",
    "market_growth": "{idea} market growth CAGR forecast",
    "market_demand": "{idea} demand trend",
    "customer_segments": "{idea} target customers who uses",
    "customer_pain_points": "{idea} customer pain points problems",
    "customer_behaviour": "{idea} customer buying behaviour preferences",
    "competitors": "{idea} competitors alternatives",
    "competitor_pricing": "{idea} pricing plans cost",
    "competitor_features": "{idea} features comparison",
    "competitor_reviews": "{idea} reviews complaints",
    "industry_trends": "{idea} industry trends",
    "industry_news": "{idea} latest news",
    "funding_activity": "{idea} startup funding investment",
}

MAX_RESULTS_PER_CATEGORY = 3
MAX_CONTENT_CHARS = 600


class SearchService:
    def __init__(self):
        # The client will be initialized dynamically on each request to handle hot-reloads of env keys
        pass

    def _get_tavily_client(self):
        api_key = os.getenv("TAVILY_API_KEY")
        if not api_key or "YOUR_KEY" in api_key or api_key.strip() == "":
            return None, False
        try:
            return TavilyClient(api_key=api_key), True
        except Exception as e:
            print(f"SearchService [ERROR]: Could not initialize search client: {e}")
            return None, False

    # ------------------------------------------------------------------
    # Milestone 1 -- unchanged. Still used by the legacy /search route and
    # by anything else in the app that wants one broad synthesized answer.
    # ------------------------------------------------------------------
    def get_market_data(self, startup_idea: str, industry: str, target_market: str) -> dict:
        """
        Formulate query and query web index for competitor and market records.
        """
        query_string = f"competitors market size and existing solutions for '{startup_idea}' in {industry} for {target_market}"
        print(f"SearchService: Query string -> {query_string}")

        client, is_configured = self._get_tavily_client()

        if not is_configured:
            print("SearchService [WARNING]: API key is not configured. Serving local simulation records.")
            return self._get_simulation_records(startup_idea, industry, target_market)

        try:
            # Query Tavily web database
            # include_answer=True requests a synthesized summary answer
            response = client.search(
                query=query_string,
                search_depth="advanced",
                include_answer=True,
                max_results=5
            )
            return {
                "query": query_string,
                "answer": response.get("answer", "No synthesized summary available."),
                "results": [
                    {
                        "title": item.get("title", "No Title"),
                        "url": item.get("url", "#"),
                        "content": item.get("content", ""),
                        "score": item.get("score", 0.0)
                    }
                    for item in response.get("results", [])
                ],
                "mode": "live"
            }
        except Exception as e:
            print(f"SearchService [ERROR]: Query request failed: {e}")
            return {
                "query": query_string,
                "answer": f"Web query error: {str(e)}. Please check configuration settings.",
                "results": [
                    {
                        "title": "Database Connection Interrupted",
                        "url": "#",
                        "content": f"The query for '{startup_idea}' failed to compile results: {str(e)}",
                        "score": 0.0
                    }
                ],
                "mode": "error"
            }

    def _get_simulation_records(self, startup_idea: str, industry: str, target_market: str) -> dict:
        """
        Generates sandbox records for development testing when API credentials are not set.
        """
        return {
            "query": f"SIMULATION_QUERY: competitors for '{startup_idea}'",
            "answer": (
                f"Note: This is simulated data (credentials not configured). "
                f"For the concept '{startup_idea}' in the '{industry}' sector targeting '{target_market}', "
                f"market validation shows solid customer demand. Key barriers to entry include customer acquisition cost and legacy product switching costs."
            ),
            "results": [
                {
                    "title": f"Top 10 Emerging Trends in {industry}",
                    "url": "https://example-market-reports.com/trends",
                    "content": f"A comprehensive look at how new startups in the {industry} sector are adjusting their offerings for {target_market} segments.",
                    "score": 0.95
                },
                {
                    "title": f"Competitor Matrix: {industry} Software and Products",
                    "url": "https://example-competitor-tracker.com/solutions",
                    "content": f"Mapping active competitors addressing needs similar to '{startup_idea}', outlining key strengths, weaknesses, and pricing structures.",
                    "score": 0.88
                },
                {
                    "title": "Segment Audience Insights",
                    "url": "https://example-surveys.com/industry-insights",
                    "content": f"A user survey focusing on the {target_market} segment. Highlights high willingness to try new solutions that optimize efficiency and reduce costs.",
                    "score": 0.79
                }
            ],
            "mode": "mock"
        }

    # ------------------------------------------------------------------
    # Milestone 2 -- new. Runs one targeted query per research category
    # and returns a normalized, deduplicated ResearchPacket for the
    # Market and Competitor analysis agents.
    # ------------------------------------------------------------------
    def run_targeted_research(
        self,
        startup_idea: str,
        target_market: Optional[str] = None,
        industry: Optional[str] = None,
        categories: Optional[List[str]] = None,
    ) -> ResearchPacket:
        categories = categories or list(QUERY_TEMPLATES.keys())
        idea_phrase = self._build_idea_phrase(startup_idea, target_market, industry)

        client, is_configured = self._get_tavily_client()
        sandbox_mode = not is_configured

        if sandbox_mode:
            print("SearchService [WARNING]: API key is not configured. Serving local simulation records for all categories.")

        all_results: List[SearchResultItem] = []
        results_by_category: Dict[str, List[dict]] = {}
        warnings: List[str] = []
        queries_run = 0

        for category in categories:
            template = QUERY_TEMPLATES.get(category)
            if not template:
                continue
            query = template.format(idea=idea_phrase)
            queries_run += 1

            if sandbox_mode:
                raw_items = self._simulation_results_for_category(query, category, idea_phrase)
            else:
                try:
                    response = client.search(
                        query=query,
                        search_depth="basic",
                        max_results=5,
                        include_answer=False,
                    )
                    raw_items = response.get("results", [])
                except Exception as e:
                    print(f"SearchService [ERROR]: Query request failed for category={category}: {e}")
                    warnings.append(f"Search failed for category '{category}'.")
                    raw_items = self._simulation_results_for_category(query, category, idea_phrase)

            normalized = [self._normalize(item, query, category) for item in raw_items]
            deduped = self._dedupe(normalized)[:MAX_RESULTS_PER_CATEGORY]

            results_by_category[category] = [r.dict() for r in deduped]
            all_results.extend(deduped)

        all_results = self._dedupe(all_results)

        if not all_results:
            warnings.append("No useful search results were collected.")

        print(f"SearchService: {queries_run} queries run, {len(all_results)} results collected (sandbox={sandbox_mode})")

        return ResearchPacket(
            startup_idea=startup_idea,
            target_market=target_market,
            industry=industry,
            results=all_results,
            results_by_category=results_by_category,
            total_queries_run=queries_run,
            total_results_collected=len(all_results),
            used_sandbox_mode=sandbox_mode,
            warnings=warnings,
        )

    def _build_idea_phrase(self, idea: str, target_market: Optional[str], industry: Optional[str]) -> str:
        parts = [idea]
        if target_market:
            parts.append(f"for {target_market}")
        return " ".join(parts).strip()

    def _normalize(self, raw: dict, query: str, category: str) -> SearchResultItem:
        content = (raw.get("content") or "")[:MAX_CONTENT_CHARS]
        return SearchResultItem(
            query=query,
            category=category,
            title=raw.get("title", ""),
            url=raw.get("url", ""),
            content=content,
            source=self._domain_from_url(raw.get("url", "")),
            published_date=raw.get("published_date"),
            relevance_score=float(raw.get("score", 0.0) or 0.0),
        )

    @staticmethod
    def _domain_from_url(url: str) -> str:
        if not url:
            return ""
        try:
            from urllib.parse import urlparse
            return urlparse(url).netloc.replace("www.", "")
        except Exception:
            return ""

    @staticmethod
    def _dedupe(items: List[SearchResultItem]) -> List[SearchResultItem]:
        seen_urls = set()
        seen_content = set()
        out: List[SearchResultItem] = []
        for item in items:
            content_key = item.content.strip().lower()[:200]
            if item.url and item.url in seen_urls:
                continue
            if content_key and content_key in seen_content:
                continue
            if item.url:
                seen_urls.add(item.url)
            if content_key:
                seen_content.add(content_key)
            out.append(item)
        out.sort(key=lambda r: r.relevance_score, reverse=True)
        return out

    def _simulation_results_for_category(self, query: str, category: str, idea_phrase: str) -> List[dict]:
        """
        Deterministic offline stand-in for Tavily, per research category.
        Keeps the app demoable without consuming API credits, same spirit
        as _get_simulation_records above but split by category so the
        downstream agents get category-tagged evidence even in sandbox mode.
        """
        return [
            {
                "title": f"[Simulated] {query.title()}",
                "url": f"https://example-market-reports.com/{category}",
                "content": (
                    f"Simulated research snippet for '{idea_phrase}' in the "
                    f"'{category}' category. Configure TAVILY_API_KEY to replace "
                    f"this with live web research."
                ),
                "score": 0.5,
                "published_date": None,
            }
        ]