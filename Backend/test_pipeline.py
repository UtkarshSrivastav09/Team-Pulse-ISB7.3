import sys
import os
import json

# Ensure services directory is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Safe utf-8 output for windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from services.orchestrator import AgentPipelineOrchestrator

def test_startup_ideas():
    orchestrator = AgentPipelineOrchestrator()

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

    print("==================================================")
    print("[TEST] RUNNING MILESTONE 2 PIPELINE VALIDATION ON 3 TEST CASES")
    print("==================================================")

    for idx, tc in enumerate(test_cases):
        print(f"\n--- Testing Test Case {idx+1}: {tc['name']} ---")
        res = orchestrator.run_pipeline(
            startup_idea=tc["idea"],
            industry=tc["industry"],
            target_market=tc["target"]
        )

        # Assertions
        assert "market_analysis" in res, "Missing market_analysis in result!"
        assert "competitor_analysis" in res, "Missing competitor_analysis in result!"
        assert "pipeline_metadata" in res, "Missing pipeline_metadata in result!"
        assert len(res["pipeline_metadata"]["execution_logs"]) == 3, "Expected 3 execution logs!"

        ma = res["market_analysis"]
        ca = res["competitor_analysis"]

        print(f"[Market Summary]: {ma.get('market_summary')[:100]}...")
        print(f"[TAM Estimate]: {ma.get('market_size_and_growth', {}).get('tam_estimate')}")
        print(f"[Customer Segments Found]: {len(ma.get('customer_segments', []))}")
        print(f"[Direct Competitors Found]: {len(ca.get('direct_competitors', []))}")
        print(f"[Market Gaps Identified]: {len(ca.get('market_gaps_and_white_space', []))}")
        print(f"[Total Duration]: {res['pipeline_metadata']['total_duration_sec']}s")
        print(f"[SUCCESS] Test Case {idx+1} PASSED!")

    print("\n[ALL PASSED] ALL 3 MILESTONE 2 TEST CASES PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_startup_ideas()
