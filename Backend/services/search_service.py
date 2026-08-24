import os
from tavily import TavilyClient

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
