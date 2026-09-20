import sys
import os
import json

# Ensure services directory is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Safe utf-8 output for windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from services.orchestrator import AgentPipelineOrchestrator
from services.advisor_agent import ConversationalAdvisorAgent
from services.report_agent import ValidationReportAgent

def test_startup_ideas():
    orchestrator = AgentPipelineOrchestrator()
    advisor = ConversationalAdvisorAgent(llm_service=orchestrator.llm_service)
    report_agent = ValidationReportAgent(llm_service=orchestrator.llm_service)

    test_cases = [
        {
            "name": "Idea 1: PetCare & HealthTech",
            "idea": "An on-demand veterinary telehealth platform with instant AI triage and symptom detection from smartphone photos.",
            "industry": "Pet Care & HealthTech",
            "target": "Pet owners, veterinary clinics"
        },
        {
            "name": "Idea 2: Green Logistics & Mobility",
            "idea": "An AI-powered route planning app for electric cargo bike deliveries in dense urban areas.",
            "industry": "Green Logistics & Mobility",
            "target": "Local e-commerce shops, urban couriers"
        },
        {
            "name": "Idea 3: EdTech & Higher Education",
            "idea": "An intelligent learning copilot that converts college lectures and PDF textbooks into interactive flashcards, quizzes, and mock tests.",
            "industry": "EdTech & Higher Education",
            "target": "University students, certification exam candidates"
        }
    ]

    print("==================================================================")
    print("🧪 [TEST] RUNNING MILESTONE 4 END-TO-END MULTI-AGENT PIPELINE SUITE (8 AGENTS)")
    print("==================================================================")

    for idx, tc in enumerate(test_cases):
        print(f"\n--- Testing Test Case {idx+1}: {tc['name']} ---")
        res = orchestrator.run_pipeline(
            startup_idea=tc["idea"],
            industry=tc["industry"],
            target_market=tc["target"]
        )

        # Assertions for all 7 pipeline steps
        assert "market_analysis" in res, "Missing market_analysis in result!"
        assert "competitor_analysis" in res, "Missing competitor_analysis in result!"
        assert "swot_analysis" in res, "Missing swot_analysis in result!"
        assert "mvp_roadmap" in res, "Missing mvp_roadmap in result!"
        assert "gtm_strategy" in res, "Missing gtm_strategy in result!"
        assert "validation_report" in res, "Missing validation_report in result!"
        assert "pipeline_metadata" in res, "Missing pipeline_metadata in result!"
        assert len(res["pipeline_metadata"]["execution_logs"]) == 7, f"Expected 7 execution logs, got {len(res['pipeline_metadata']['execution_logs'])}!"

        ma = res["market_analysis"]
        ca = res["competitor_analysis"]
        swot = res["swot_analysis"]
        mvp = res["mvp_roadmap"]
        gtm = res["gtm_strategy"]
        vr = res["validation_report"]

        print(f"  📊 [Market Agent]: TAM {ma.get('market_size_and_growth', {}).get('tam_estimate')} | Segments: {len(ma.get('customer_segments', []))}")
        print(f"  ⚔️ [Competitor Agent]: {len(ca.get('direct_competitors', []))} direct | {len(ca.get('market_gaps_and_white_space', []))} white-spaces")
        print(f"  🛡️ [SWOT/Risk Agent]: {len(swot.get('swot', {}).get('strengths', []))} strengths | {len(swot.get('risk_assessment', []))} risk mitigations")
        print(f"  ⚡ [MVP Agent]: {len(mvp.get('moscow_matrix', {}).get('must_have', []))} must-haves | Build: {mvp.get('estimated_mvp_build_time_weeks')} weeks")
        print(f"  🎯 [GTM Agent]: {len(gtm.get('acquisition_channels', []))} channels | {len(gtm.get('first_100_customers_playbook', []))} playbook steps")
        print(f"  📑 [Report Agent]: Scorecard {vr.get('executive_scorecard', {}).get('overall_feasibility_score')}% | Report: {len(vr.get('markdown_report', ''))} chars")
        print(f"  ⏱️ [Total Pipeline Duration]: {res['pipeline_metadata']['total_duration_sec']}s")

        # Test Conversational Advisor Agent on this dossier (8th Agent)
        print(f"  🤖 Testing Conversational Advisor Agent...")
        chat_res = advisor.chat(
            user_message="What is the biggest threat to this business model and how do we defend against it?",
            history=[],
            validation_context=res
        )
        assert "reply" in chat_res and chat_res["reply"], "Advisor reply is empty!"
        assert "suggested_follow_ups" in chat_res and len(chat_res["suggested_follow_ups"]) > 0, "Missing follow-ups!"
        print(f"  💬 [Advisor Reply Length]: {len(chat_res['reply'])} chars | Suggestions: {len(chat_res['suggested_follow_ups'])}")

        # Test Report Generation Export Synthesis
        print(f"  📤 Testing Report Agent Standalone Generation...")
        standalone_report = report_agent.generate_report(res)
        assert len(standalone_report.get("markdown_report", "")) > 500, "Markdown report output too short!"
        assert "executive_scorecard" in standalone_report, "Missing executive scorecard in report!"
        print(f"  ✅ Report Generator verified ({len(standalone_report['markdown_report'])} markdown chars).")

        print(f"✅ [SUCCESS] Test Case {idx+1} PASSED ALL 8 AGENT ASSERTIONS!")

    print("\n🎉 [ALL PASSED] ALL 3 MILESTONE 4 MULTI-AGENT TEST CASES PASSED FULLY & FLAWLESSLY!")

if __name__ == "__main__":
    test_startup_ideas()
