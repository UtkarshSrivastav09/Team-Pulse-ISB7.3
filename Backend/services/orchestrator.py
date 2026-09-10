import sys
import time
from typing import Dict, Any, List

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from services.search_service import SearchService
from services.market_agent import MarketOpportunityAgent
from services.competitor_agent import CompetitorDiscoveryAgent
from services.llm_service import LLMService

class AgentPipelineOrchestrator:
    """
    Milestone 2 Agent Orchestrator:
    Chains and coordinates the multi-agent pipeline in sequence:
    [Agent 1: Web Search Agent] -> [Agent 2: Market Opportunity Agent] -> [Agent 3: Competitor Comparison Agent]
    
    Provides structured intermediate logging, performance timing, schema normalization,
    and resilient error handling across all execution stages.
    """
    def __init__(self, search_service: SearchService = None, llm_service: LLMService = None):
        self.search_service = search_service or SearchService()
        self.llm_service = llm_service or LLMService()
        self.market_agent = MarketOpportunityAgent(llm_service=self.llm_service)
        self.competitor_agent = CompetitorDiscoveryAgent(llm_service=self.llm_service)

    def run_pipeline(self, startup_idea: str, industry: str, target_market: str) -> Dict[str, Any]:
        """
        Executes the complete end-to-end multi-agent pipeline for a startup concept.
        """
        pipeline_start = time.time()
        logs: List[Dict[str, Any]] = []

        print(f"\n=======================================================")
        print(f"🚀 [ORCHESTRATOR] Starting Multi-Agent Pipeline Execution")
        print(f"💡 Startup Idea: '{startup_idea}'")
        print(f"🏢 Industry: '{industry}' | 🎯 Target: '{target_market}'")
        print(f"=======================================================\n")

        # -----------------------------------------------------------------
        # STEP 1: Web Search Agent (Milestone 1)
        # -----------------------------------------------------------------
        step1_start = time.time()
        print(f"📡 [STEP 1/3] Invoking Web Search Agent...")
        try:
            search_data = self.search_service.get_market_data(
                startup_idea=startup_idea,
                industry=industry,
                target_market=target_market
            )
            step1_duration = round(time.time() - step1_start, 2)
            results_count = len(search_data.get("results", []))
            print(f"✅ [STEP 1/3] Search Agent completed in {step1_duration}s. Mode: {search_data.get('mode')}, Records Found: {results_count}")
            logs.append({
                "agent": "WebSearchAgent",
                "step": 1,
                "status": "success",
                "duration_sec": step1_duration,
                "message": f"Successfully retrieved {results_count} market records from web index (Mode: {search_data.get('mode')})."
            })
        except Exception as e:
            step1_duration = round(time.time() - step1_start, 2)
            print(f"❌ [STEP 1/3] Search Agent failed: {e}. Falling back to simulation.")
            search_data = self.search_service._get_simulation_records(startup_idea, industry, target_market)
            logs.append({
                "agent": "WebSearchAgent",
                "step": 1,
                "status": "fallback",
                "duration_sec": step1_duration,
                "message": f"Search encountered error: {str(e)}. Used simulation fallback."
            })

        # -----------------------------------------------------------------
        # STEP 2: Market Opportunity & Customer Segmentation Agent (Milestone 2)
        # -----------------------------------------------------------------
        step2_start = time.time()
        print(f"📊 [STEP 2/3] Invoking Market Opportunity & Segmentation Agent...")
        try:
            market_analysis = self.market_agent.analyze(
                startup_idea=startup_idea,
                industry=industry,
                target_market=target_market,
                search_data=search_data
            )
            step2_duration = round(time.time() - step2_start, 2)
            segments_count = len(market_analysis.get("customer_segments", []))
            print(f"✅ [STEP 2/3] Market Agent completed in {step2_duration}s. Status: {market_analysis.get('agent_status')}, Segments: {segments_count}")
            logs.append({
                "agent": "MarketOpportunityAgent",
                "step": 2,
                "status": "success",
                "duration_sec": step2_duration,
                "message": f"Extracted market size ({market_analysis.get('market_size_and_growth', {}).get('tam_estimate')}) and {segments_count} customer segments."
            })
        except Exception as e:
            step2_duration = round(time.time() - step2_start, 2)
            print(f"❌ [STEP 2/3] Market Agent error: {e}. Generating fallback.")
            market_analysis = self.market_agent._heuristic_fallback(startup_idea, industry, target_market, search_data)
            logs.append({
                "agent": "MarketOpportunityAgent",
                "step": 2,
                "status": "fallback",
                "duration_sec": step2_duration,
                "message": f"Market analysis fallback applied due to: {str(e)}"
            })

        # -----------------------------------------------------------------
        # STEP 3: Competitor Discovery & Comparison Agent (Milestone 2)
        # -----------------------------------------------------------------
        step3_start = time.time()
        print(f"⚔️ [STEP 3/3] Invoking Competitor Discovery & Comparison Agent...")
        try:
            competitor_analysis = self.competitor_agent.analyze(
                startup_idea=startup_idea,
                industry=industry,
                target_market=target_market,
                search_data=search_data,
                market_context=market_analysis
            )
            step3_duration = round(time.time() - step3_start, 2)
            direct_count = len(competitor_analysis.get("direct_competitors", []))
            gaps_count = len(competitor_analysis.get("market_gaps_and_white_space", []))
            print(f"✅ [STEP 3/3] Competitor Agent completed in {step3_duration}s. Status: {competitor_analysis.get('agent_status')}, Competitors: {direct_count}, Gaps: {gaps_count}")
            logs.append({
                "agent": "CompetitorDiscoveryAgent",
                "step": 3,
                "status": "success",
                "duration_sec": step3_duration,
                "message": f"Identified {direct_count} direct competitors and {gaps_count} white-space market opportunities."
            })
        except Exception as e:
            step3_duration = round(time.time() - step3_start, 2)
            print(f"❌ [STEP 3/3] Competitor Agent error: {e}. Generating fallback.")
            competitor_analysis = self.competitor_agent._heuristic_fallback(startup_idea, industry, target_market, search_data)
            logs.append({
                "agent": "CompetitorDiscoveryAgent",
                "step": 3,
                "status": "fallback",
                "duration_sec": step3_duration,
                "message": f"Competitor analysis fallback applied due to: {str(e)}"
            })

        total_duration = round(time.time() - pipeline_start, 2)
        print(f"\n✨ [ORCHESTRATOR] Full Pipeline completed successfully in {total_duration}s.\n")

        # -----------------------------------------------------------------
        # Assemble Unified Milestone 2 Response Payload
        # -----------------------------------------------------------------
        return {
            "startup_idea": startup_idea,
            "industry": industry,
            "target_market": target_market,
            "pipeline_metadata": {
                "total_duration_sec": total_duration,
                "pipeline_version": "2.0.0",
                "agents_executed": ["WebSearchAgent", "MarketOpportunityAgent", "CompetitorDiscoveryAgent"],
                "execution_logs": logs
            },
            # Milestone 1 Data
            "search_data": {
                "query": search_data.get("query"),
                "answer": search_data.get("answer"),
                "results": search_data.get("results", []),
                "mode": search_data.get("mode")
            },
            # Backwards compatibility flat fields for existing UI components
            "query": search_data.get("query"),
            "answer": search_data.get("answer"),
            "results": search_data.get("results", []),
            "mode": search_data.get("mode"),
            # Milestone 2 Structured Agent Intelligence
            "market_analysis": market_analysis,
            "competitor_analysis": competitor_analysis
        }
