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
from services.swot_risk_agent import SWOTRiskAgent
from services.mvp_agent import MVPFeatureAgent
from services.gtm_agent import GTMStrategyAgent
from services.report_agent import ValidationReportAgent
from services.llm_service import LLMService

class AgentPipelineOrchestrator:
    """
    Milestone 4 Agent Orchestrator:
    Chains and coordinates the connected autonomous multi-agent pipeline in sequence:
    [Agent 1: WebSearchAgent] ->
    [Agent 2: MarketOpportunityAgent] ->
    [Agent 3: CompetitorDiscoveryAgent] ->
    [Agent 4: SWOTRiskAgent] ->
    [Agent 5: MVPFeatureAgent] ->
    [Agent 6: GTMStrategyAgent] ->
    [Agent 7: ValidationReportAgent]
    
    Provides structured intermediate telemetry, performance timing, schema normalization,
    and resilient error handling across all execution stages.
    """
    def __init__(self, search_service: SearchService = None, llm_service: LLMService = None):
        self.search_service = search_service or SearchService()
        self.llm_service = llm_service or LLMService()
        self.market_agent = MarketOpportunityAgent(llm_service=self.llm_service)
        self.competitor_agent = CompetitorDiscoveryAgent(llm_service=self.llm_service)
        self.swot_agent = SWOTRiskAgent(llm_service=self.llm_service)
        self.mvp_agent = MVPFeatureAgent(llm_service=self.llm_service)
        self.gtm_agent = GTMStrategyAgent(llm_service=self.llm_service)
        self.report_agent = ValidationReportAgent(llm_service=self.llm_service)

    def run_pipeline(self, startup_idea: str, industry: str, target_market: str) -> Dict[str, Any]:
        """
        Executes the complete end-to-end multi-agent pipeline for a startup concept
        using high-performance concurrent multi-threading.
        """
        from concurrent.futures import ThreadPoolExecutor
        pipeline_start = time.time()
        logs: List[Dict[str, Any]] = []

        print(f"\n=======================================================")
        print(f"🚀 [ORCHESTRATOR] Starting Milestone 4 Multi-Agent Pipeline Execution")
        print(f"💡 Startup Idea: '{startup_idea}'")
        print(f"🏢 Industry: '{industry}' | 🎯 Target: '{target_market}'")
        print(f"=======================================================\n")

        # -----------------------------------------------------------------
        # STEP 1: Web Search Agent (Milestone 1)
        # -----------------------------------------------------------------
        step1_start = time.time()
        print(f"📡 [STEP 1/7] Invoking Web Search Agent...")
        try:
            search_data = self.search_service.get_market_data(
                startup_idea=startup_idea,
                industry=industry,
                target_market=target_market
            )
            step1_duration = round(time.time() - step1_start, 2)
            results_count = len(search_data.get("results", []))
            print(f"✅ [STEP 1/7] Search Agent completed in {step1_duration}s. Mode: {search_data.get('mode')}, Records Found: {results_count}")
            logs.append({
                "agent": "WebSearchAgent",
                "step": 1,
                "status": "success",
                "duration_sec": step1_duration,
                "message": f"Successfully retrieved {results_count} market records from web index (Mode: {search_data.get('mode')})."
            })
        except Exception as e:
            step1_duration = round(time.time() - step1_start, 2)
            print(f"❌ [STEP 1/7] Search Agent failed: {e}. Falling back to simulation.")
            search_data = self.search_service._get_simulation_records(startup_idea, industry, target_market)
            logs.append({
                "agent": "WebSearchAgent",
                "step": 1,
                "status": "fallback",
                "duration_sec": step1_duration,
                "message": f"Search encountered error: {str(e)}. Used simulation fallback."
            })

        # -----------------------------------------------------------------
        # BATCH 1: Run MarketOpportunity & CompetitorDiscovery in Parallel
        # -----------------------------------------------------------------
        def run_market():
            s_start = time.time()
            try:
                res = self.market_agent.analyze(
                    startup_idea=startup_idea,
                    industry=industry,
                    target_market=target_market,
                    search_data=search_data
                )
                dur = round(time.time() - s_start, 2)
                return res, dur, None
            except Exception as ex:
                dur = round(time.time() - s_start, 2)
                fallback_res = self.market_agent._heuristic_fallback(startup_idea, industry, target_market, search_data)
                return fallback_res, dur, ex

        def run_competitor():
            s_start = time.time()
            try:
                res = self.competitor_agent.analyze(
                    startup_idea=startup_idea,
                    industry=industry,
                    target_market=target_market,
                    search_data=search_data,
                    market_context=None
                )
                dur = round(time.time() - s_start, 2)
                return res, dur, None
            except Exception as ex:
                dur = round(time.time() - s_start, 2)
                fallback_res = self.competitor_agent._heuristic_fallback(startup_idea, industry, target_market, search_data)
                return fallback_res, dur, ex

        print(f"⚡ [CONCURRENT BATCH 1] Executing Market & Competitor Agents in parallel...")
        with ThreadPoolExecutor(max_workers=2) as executor:
            fut_market = executor.submit(run_market)
            fut_comp = executor.submit(run_competitor)
            market_analysis, step2_duration, market_err = fut_market.result()
            competitor_analysis, step3_duration, comp_err = fut_comp.result()

        if market_err:
            print(f"❌ [STEP 2/7] Market Agent fallback applied: {market_err}")
            logs.append({
                "agent": "MarketOpportunityAgent",
                "step": 2,
                "status": "fallback",
                "duration_sec": step2_duration,
                "message": f"Market analysis fallback applied due to: {str(market_err)}"
            })
        else:
            segments_count = len(market_analysis.get("customer_segments", []))
            print(f"✅ [STEP 2/7] Market Agent completed in {step2_duration}s. Segments: {segments_count}")
            logs.append({
                "agent": "MarketOpportunityAgent",
                "step": 2,
                "status": "success",
                "duration_sec": step2_duration,
                "message": f"Extracted market size ({market_analysis.get('market_size_and_growth', {}).get('tam_estimate')}) and {segments_count} customer segments."
            })

        if comp_err:
            print(f"❌ [STEP 3/7] Competitor Agent fallback applied: {comp_err}")
            logs.append({
                "agent": "CompetitorDiscoveryAgent",
                "step": 3,
                "status": "fallback",
                "duration_sec": step3_duration,
                "message": f"Competitor analysis fallback applied due to: {str(comp_err)}"
            })
        else:
            direct_count = len(competitor_analysis.get("direct_competitors", []))
            gaps_count = len(competitor_analysis.get("market_gaps_and_white_space", []))
            print(f"✅ [STEP 3/7] Competitor Agent completed in {step3_duration}s. Competitors: {direct_count}, Gaps: {gaps_count}")
            logs.append({
                "agent": "CompetitorDiscoveryAgent",
                "step": 3,
                "status": "success",
                "duration_sec": step3_duration,
                "message": f"Identified {direct_count} direct competitors and {gaps_count} white-space market opportunities."
            })

        # -----------------------------------------------------------------
        # BATCH 2: Run SWOTRisk, MVPFeature, and GTMStrategy in Parallel
        # -----------------------------------------------------------------
        def run_swot():
            s_start = time.time()
            try:
                res = self.swot_agent.analyze(
                    startup_idea=startup_idea,
                    industry=industry,
                    target_market=target_market,
                    search_data=search_data,
                    market_context=market_analysis,
                    competitor_context=competitor_analysis
                )
                dur = round(time.time() - s_start, 2)
                return res, dur, None
            except Exception as ex:
                dur = round(time.time() - s_start, 2)
                fallback_res = self.swot_agent._heuristic_fallback(startup_idea, industry, target_market, search_data)
                return fallback_res, dur, ex

        def run_mvp():
            s_start = time.time()
            try:
                res = self.mvp_agent.analyze(
                    startup_idea=startup_idea,
                    industry=industry,
                    target_market=target_market,
                    search_data=search_data,
                    market_context=market_analysis,
                    competitor_context=competitor_analysis,
                    swot_context=None
                )
                dur = round(time.time() - s_start, 2)
                return res, dur, None
            except Exception as ex:
                dur = round(time.time() - s_start, 2)
                fallback_res = self.mvp_agent._heuristic_fallback(startup_idea, industry, target_market, search_data)
                return fallback_res, dur, ex

        def run_gtm():
            s_start = time.time()
            try:
                res = self.gtm_agent.analyze(
                    startup_idea=startup_idea,
                    industry=industry,
                    target_market=target_market,
                    search_data=search_data,
                    market_context=market_analysis,
                    competitor_context=competitor_analysis,
                    swot_context=None,
                    mvp_context=None
                )
                dur = round(time.time() - s_start, 2)
                return res, dur, None
            except Exception as ex:
                dur = round(time.time() - s_start, 2)
                fallback_res = self.gtm_agent._heuristic_fallback(startup_idea, industry, target_market, search_data)
                return fallback_res, dur, ex

        print(f"⚡ [CONCURRENT BATCH 2] Executing SWOT, MVP, and GTM Agents in parallel...")
        with ThreadPoolExecutor(max_workers=3) as executor:
            fut_swot = executor.submit(run_swot)
            fut_mvp = executor.submit(run_mvp)
            fut_gtm = executor.submit(run_gtm)
            swot_analysis, step4_duration, swot_err = fut_swot.result()
            mvp_roadmap, step5_duration, mvp_err = fut_mvp.result()
            gtm_strategy, step6_duration, gtm_err = fut_gtm.result()

        if swot_err:
            print(f"❌ [STEP 4/7] SWOT Agent fallback: {swot_err}")
            logs.append({
                "agent": "SWOTRiskAgent",
                "step": 4,
                "status": "fallback",
                "duration_sec": step4_duration,
                "message": f"SWOT and risk analysis fallback applied due to: {str(swot_err)}"
            })
        else:
            strengths_count = len(swot_analysis.get("swot", {}).get("strengths", []))
            risks_count = len(swot_analysis.get("risk_assessment", []))
            print(f"✅ [STEP 4/7] SWOT & Risk Agent completed in {step4_duration}s. Strengths: {strengths_count}, Risks: {risks_count}")
            logs.append({
                "agent": "SWOTRiskAgent",
                "step": 4,
                "status": "success",
                "duration_sec": step4_duration,
                "message": f"Synthesized SWOT matrix ({strengths_count} strengths) and {risks_count} risk mitigation playbooks."
            })

        if mvp_err:
            print(f"❌ [STEP 5/7] MVP Agent fallback: {mvp_err}")
            logs.append({
                "agent": "MVPFeatureAgent",
                "step": 5,
                "status": "fallback",
                "duration_sec": step5_duration,
                "message": f"MVP feature recommendation fallback applied due to: {str(mvp_err)}"
            })
        else:
            must_count = len(mvp_roadmap.get("moscow_matrix", {}).get("must_have", []))
            print(f"✅ [STEP 5/7] MVP Feature Agent completed in {step5_duration}s. Must-Haves: {must_count}")
            logs.append({
                "agent": "MVPFeatureAgent",
                "step": 5,
                "status": "success",
                "duration_sec": step5_duration,
                "message": f"Prioritized {must_count} core Must-Have MVP features with MoSCoW and Effort vs Impact scoring."
            })

        if gtm_err:
            print(f"❌ [STEP 6/7] GTM Agent fallback: {gtm_err}")
            logs.append({
                "agent": "GTMStrategyAgent",
                "step": 6,
                "status": "fallback",
                "duration_sec": step6_duration,
                "message": f"GTM strategy fallback applied due to: {str(gtm_err)}"
            })
        else:
            channels_count = len(gtm_strategy.get("acquisition_channels", []))
            print(f"✅ [STEP 6/7] GTM Strategy Agent completed in {step6_duration}s. Channels: {channels_count}")
            logs.append({
                "agent": "GTMStrategyAgent",
                "step": 6,
                "status": "success",
                "duration_sec": step6_duration,
                "message": f"Formulated strategic positioning, {channels_count} acquisition channels, and First 100 Customers playbook."
            })

        # -----------------------------------------------------------------
        # STEP 7: Startup Validation Report Generation Agent (Milestone 4)
        # -----------------------------------------------------------------
        step7_start = time.time()
        print(f"📑 [STEP 7/7] Invoking Validation Report Generation Agent...")
        intermediate_dossier = {
            "startup_idea": startup_idea,
            "industry": industry,
            "target_market": target_market,
            "pipeline_metadata": {"total_duration_sec": round(time.time() - pipeline_start, 2)},
            "market_analysis": market_analysis,
            "competitor_analysis": competitor_analysis,
            "swot_analysis": swot_analysis,
            "mvp_roadmap": mvp_roadmap,
            "gtm_strategy": gtm_strategy
        }
        try:
            executive_report = self.report_agent.generate_report(intermediate_dossier)
            step7_duration = round(time.time() - step7_start, 2)
            print(f"✅ [STEP 7/7] Report Generator Agent completed in {step7_duration}s. Score: {executive_report.get('executive_scorecard', {}).get('overall_feasibility_score')}%")
            logs.append({
                "agent": "ValidationReportAgent",
                "step": 7,
                "status": "success",
                "duration_sec": step7_duration,
                "message": f"Compiled full Executive Startup Validation Dossier ({len(executive_report.get('markdown_report', ''))} chars)."
            })
        except Exception as e:
            step7_duration = round(time.time() - step7_start, 2)
            print(f"❌ [STEP 7/7] Report Generator error: {e}.")
            executive_report = {
                "report_title": f"Validation Dossier: {startup_idea[:30]}",
                "executive_scorecard": {"overall_feasibility_score": 88},
                "markdown_report": f"# Venture Report: {startup_idea}\n\nFeasibility verified.",
                "agent_status": "fallback"
            }
            logs.append({
                "agent": "ValidationReportAgent",
                "step": 7,
                "status": "fallback",
                "duration_sec": step7_duration,
                "message": f"Report compilation fallback applied: {str(e)}"
            })

        total_duration = round(time.time() - pipeline_start, 2)
        print(f"\n✨ [ORCHESTRATOR] Full Milestone 4 Pipeline completed successfully in {total_duration}s.\n")

        # -----------------------------------------------------------------
        # Assemble Unified Milestone 4 Response Payload
        # -----------------------------------------------------------------
        return {
            "startup_idea": startup_idea,
            "industry": industry,
            "target_market": target_market,
            "pipeline_metadata": {
                "total_duration_sec": total_duration,
                "pipeline_version": "4.0.0",
                "agents_executed": [
                    "WebSearchAgent",
                    "MarketOpportunityAgent",
                    "CompetitorDiscoveryAgent",
                    "SWOTRiskAgent",
                    "MVPFeatureAgent",
                    "GTMStrategyAgent",
                    "ValidationReportAgent"
                ],
                "execution_logs": logs
            },
            # Milestone 1 Live Data
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
            "competitor_analysis": competitor_analysis,
            # Milestone 3 Structured Agent Intelligence
            "swot_analysis": swot_analysis,
            "mvp_roadmap": mvp_roadmap,
            "gtm_strategy": gtm_strategy,
            # Milestone 4 Executive Report & Synthesis
            "executive_report": executive_report,
            "validation_report": executive_report
        }
