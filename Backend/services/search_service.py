import os
from tavily import TavilyClient

class SearchService:
    def __init__(self):
        # The client will be initialized dynamically on each request to handle hot-reloads of env keys
        pass

    def _get_api_keys(self):
        api_key = os.getenv("TAVILY_API_KEY")
        if not api_key or "YOUR_KEY" in api_key or api_key.strip() == "":
            return []
        # Split by comma to support multiple keys for fallback rotation
        return [k.strip() for k in api_key.split(",") if k.strip()]

    def _get_tavily_client(self):
        keys = self._get_api_keys()
        if not keys:
            return None, False
        try:
            return TavilyClient(api_key=keys[0]), True
        except Exception as e:
            print(f"SearchService [ERROR]: Could not initialize search client: {e}")
            return None, False

    def get_market_data(self, startup_idea: str, industry: str, target_market: str) -> dict:
        """
        Formulate query and query web index for competitor and market records.
        Supports automatic rotation of API keys if quota limits are reached.
        """
        query_string = f"competitors market size and existing solutions for '{startup_idea}' in {industry} for {target_market}"
        print(f"SearchService: Query string -> {query_string}")

        keys = self._get_api_keys()

        if not keys:
            print("SearchService [WARNING]: No API keys configured. Serving local simulation records.")
            return self._get_simulation_records(startup_idea, industry, target_market)

        last_exception = None
        for idx, key in enumerate(keys):
            try:
                print(f"SearchService: Attempting query with Tavily key index {idx}...")
                client = TavilyClient(api_key=key)
                
                # Query Tavily web database
                response = client.search(
                    query=query_string,
                    search_depth="advanced",
                    include_answer=True,
                    max_results=5
                )
                
                # Success! Return the live results
                print(f"SearchService: Query succeeded using Tavily key index {idx}.")
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
                print(f"SearchService [WARNING]: Key index {idx} failed or quota exceeded: {e}")
                last_exception = e
                # Loop continues to try the next key

        # If all keys failed, fall back to showing the error details gracefully
        print("SearchService [ERROR]: All configured Tavily keys failed.")
        return {
            "query": query_string,
            "answer": f"Web query error: {str(last_exception)}. Please check your API keys or configuration settings.",
            "results": [
                {
                    "title": "Database Connection Interrupted",
                    "url": "#",
                    "content": f"The query for '{startup_idea}' failed to compile results: {str(last_exception)}",
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
