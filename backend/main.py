import os
import sys
import json
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Ensure UTF-8 output on Windows console
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Import the Services and Orchestrator
from services.search_service import SearchService
from services.orchestrator import AgentPipelineOrchestrator
from services.advisor_agent import ConversationalAdvisorAgent

# Load environment variables
load_dotenv(override=True)

app = FastAPI(
    title="VenturePulse - AI Startup Idea Validator & Market Intelligence API",
    description="Backend API powering VenturePulse Multi-Agent Startup Validator (Milestone 1, 2, & 3 connected pipeline).",
    version="3.0.0"
)

# Enable CORS (Cross-Origin Resource Sharing)
# Allows the React/Vite frontend to communicate seamlessly with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Services & Multi-Agent Orchestrator
search_service = SearchService()
orchestrator = AgentPipelineOrchestrator(search_service=search_service)
advisor_agent = ConversationalAdvisorAgent(llm_service=orchestrator.llm_service)

# Pydantic request models for input validation
class StartupValidationRequest(BaseModel):
    startup_idea: str = Field(..., min_length=3, description="Core startup idea or description")
    industry: str = Field(..., min_length=2, description="The market industry or domain")
    target_market: str = Field(..., min_length=2, description="The target audience or customer base")

class AdvisorChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Founder question or query")
    history: list = Field(default=[], description="Previous conversation message turns")
    validation_context: dict = Field(default={}, description="Validated startup dossier and agent outputs")

@app.on_event("startup")
def print_startup_banner():
    """
    Prints executive terminal banner on API startup showing connected agents and routes.
    """
    has_tavily = search_service._get_tavily_client()[1]
    print("\n" + "=" * 72)
    print("🚀 [VENTUREPULSE] Multi-Agent Startup Intelligence Engine (v4.0.0)")
    print("=" * 72)
    print(f"📡 Search Index Connection: {'[LIVE TAVILY CONNECTED]' if has_tavily else '[ENTERPRISE SIMULATION / HYBRID]'}")
    print("🤖 8 Active Connected Intelligence Agents:")
    print("   ├─ [1] WebSearchAgent (Market Scraping & Live Web Indexing - M1)")
    print("   ├─ [2] MarketOpportunityAgent (TAM/SAM/SOM & Personas - M2)")
    print("   ├─ [3] CompetitorDiscoveryAgent (2x2 Matrix & Market White Spaces - M2)")
    print("   ├─ [4] SWOTRiskAgent (SWOT Matrix & Risk Mitigations - M3)")
    print("   ├─ [5] MVPFeatureAgent (MoSCoW & Effort vs Impact Prioritization - M3)")
    print("   ├─ [6] GTMStrategyAgent (Positioning, Acquisition & Launch Playbook - M3)")
    print("   ├─ [7] ValidationReportAgent (Executive Dossier & Export Engine - M4)")
    print("   └─ [8] ConversationalAdvisorAgent (Context-Aware Multi-turn Q&A - M3/M4)")
    print("⚡ Active REST Endpoints:")
    print("   ├─ GET  /              -> Multi-Agent API Status & Developer Portal")
    print("   ├─ GET  /agents        -> Agent Pipeline Architecture Metadata")
    print("   ├─ GET  /health        -> Service Healthcheck (200 OK)")
    print("   ├─ POST /validate      -> Multi-Agent Autonomous Validation Pipeline (M1-M4)")
    print("   ├─ POST /advisor/chat  -> Conversational Startup Advisor Copilot (M3/M4)")
    print("   └─ POST /export/report -> Executive Dossier Export Engine (Markdown/JSON) (M4)")
    print("=" * 72 + "\n")

@app.get("/")
def home(request: Request, format: str = None):
    has_tavily = bool(search_service._get_tavily_client()[1])
    
    json_data = {
        "message": "VenturePulse Multi-Agent API is active (v4.0.0)",
        "version": "4.0.0",
        "search_index_connected": has_tavily,
        "active_agents": [
            "WebSearchAgent (Milestone 1)",
            "MarketOpportunityAgent (Milestone 2)",
            "CompetitorDiscoveryAgent (Milestone 2)",
            "SWOTRiskAgent (Milestone 3)",
            "MVPFeatureAgent (Milestone 3)",
            "GTMStrategyAgent (Milestone 3)",
            "ValidationReportAgent (Milestone 4)",
            "ConversationalAdvisorAgent (Milestone 3/4)"
        ],
        "endpoints": {
            "validate": "POST /validate",
            "advisor_chat": "POST /advisor/chat",
            "export_report": "POST /export/report",
            "agents_metadata": "GET /agents",
            "health": "GET /health"
        }
    }

    # If client requests JSON explicitly, return JSONResponse
    accept_header = request.headers.get("accept", "")
    if format == "json" or "application/json" in accept_header and "text/html" not in accept_header:
        print("📡 [API GET /] Returning JSON payload.")
        return JSONResponse(content=json_data)

    print("📡 [API GET /] Serving interactive Developer Portal HTML.")
    
    # Return Rich, Stunning Developer Portal & API Dashboard
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Startup Idea Validator • Multi-Agent Intelligence API (v2.0.0)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg: #090d16;
            --card-bg: rgba(15, 23, 42, 0.75);
            --card-border: rgba(255, 255, 255, 0.1);
            --primary: #3b82f6;
            --primary-glow: rgba(59, 130, 246, 0.25);
            --accent: #06b6d4;
            --success: #10b981;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-sans);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px 80px 20px;
            position: relative;
            overflow-x: hidden;
        }}
        /* Ambient Aurora Orbs */
        .bg-glow {{
            position: absolute;
            border-radius: 50%;
            filter: blur(140px);
            pointer-events: none;
            z-index: 0;
        }}
        .bg-glow-1 {{
            width: 500px; height: 500px;
            top: -100px; left: -100px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.18), transparent 70%);
        }}
        .bg-glow-2 {{
            width: 600px; height: 600px;
            bottom: 0; right: -100px;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.14), transparent 70%);
        }}
        .container {{
            max-width: 1060px;
            width: 100%;
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }}
        /* Header Hero */
        .header {{
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }}
        .status-badge {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            border-radius: 9999px;
            background: rgba(16, 185, 129, 0.12);
            border: 1px solid rgba(16, 185, 129, 0.35);
            color: #34d399;
            font-size: 12.5px;
            font-weight: 700;
        }}
        .pulse-dot {{
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
            animation: pulse 1.5s infinite;
        }}
        @keyframes pulse {{
            0%, 100% {{ transform: scale(1); opacity: 1; }}
            50% {{ transform: scale(1.4); opacity: 0.6; }}
        }}
        .title {{
            font-size: 34px;
            font-weight: 800;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #ffffff 30%, #94a3b8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        .subtitle {{
            color: var(--text-muted);
            font-size: 15px;
            max-width: 680px;
            line-height: 1.55;
        }}
        .nav-buttons {{
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 8px;
        }}
        .btn {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 9px 18px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
        }}
        .btn-primary {{
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 14px var(--primary-glow);
        }}
        .btn-primary:hover {{
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }}
        .btn-glass {{
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-main);
            border: 1px solid var(--card-border);
            backdrop-filter: blur(8px);
        }}
        .btn-glass:hover {{
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
        }}
        /* Glass Cards */
        .glass-card {{
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            padding: 24px 28px;
            backdrop-filter: blur(16px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }}
        .card-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 10px;
        }}
        .card-title {{
            font-size: 17px;
            font-weight: 700;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 8px;
        }}
        .card-badge {{
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: rgba(59, 130, 246, 0.2);
            color: #93c5fd;
            padding: 3px 10px;
            border-radius: 6px;
            border: 1px solid rgba(59, 130, 246, 0.3);
        }}
        /* Pipeline Flow Grid */
        .pipeline-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 14px;
        }}
        .agent-node {{
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            transition: all 0.2s ease;
        }}
        .agent-node:hover {{
            background: rgba(255, 255, 255, 0.06);
            border-color: #3b82f6;
            transform: translateY(-2px);
        }}
        .agent-node-top {{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .agent-step-tag {{
            font-size: 10.5px;
            font-weight: 800;
            background: #2563eb;
            color: #ffffff;
            padding: 2px 7px;
            border-radius: 4px;
        }}
        .agent-name {{
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
        }}
        .agent-role {{
            font-size: 12px;
            color: var(--text-muted);
            line-height: 1.45;
        }}
        /* JSON Console Box */
        .json-box {{
            background: #020617;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            padding: 18px;
            font-family: var(--font-mono);
            font-size: 13px;
            color: #38bdf8;
            overflow-x: auto;
            line-height: 1.5;
            position: relative;
        }}
        .copy-btn {{
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-weight: 600;
        }}
        .copy-btn:hover {{
            background: #2563eb;
        }}
        /* Interactive Tester */
        .tester-inputs {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
        }}
        @media (max-width: 768px) {{
            .tester-inputs {{ grid-template-columns: 1fr; }}
        }}
        .input-box input, .input-box textarea {{
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            padding: 10px 14px;
            color: #ffffff;
            font-family: var(--font-sans);
            font-size: 13px;
            outline: none;
        }}
        .input-box input:focus, .input-box textarea:focus {{
            border-color: #3b82f6;
            background: rgba(255, 255, 255, 0.08);
        }}
        .test-output {{
            margin-top: 14px;
            background: #020617;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 14px;
            font-family: var(--font-mono);
            font-size: 12px;
            max-height: 240px;
            overflow-y: auto;
            white-space: pre-wrap;
            display: none;
        }}
        .footer {{
            text-align: center;
            color: var(--text-muted);
            font-size: 13px;
            margin-top: 10px;
        }}
    </style>
</head>
<body>
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>

    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <div class="status-badge">
                <span class="pulse-dot"></span>
                <span>Multi-Agent Engine Active • Milestone 2 Ready</span>
            </div>
            <h1 class="title">AI Startup Idea Validator API</h1>
            <p class="subtitle">
                Autonomous sequential pipeline extracting live web records, computing algorithmic TAM/SAM/SOM financial models, and synthesizing competitive positioning matrices.
            </p>
            <div class="nav-buttons">
                <a href="http://localhost:5173" target="_blank" class="btn btn-primary">
                    <span>🚀 Launch React 18 Dashboard</span>
                </a>
                <a href="/docs" target="_blank" class="btn btn-glass">
                    <span>📖 Interactive Swagger Docs</span>
                </a>
                <a href="/agents" target="_blank" class="btn btn-glass">
                    <span>🤖 View /agents Metadata</span>
                </a>
                <a href="/?format=json" class="btn btn-glass">
                    <span>📋 View Raw JSON</span>
                </a>
            </div>
        </div>

        <!-- 1. System Status & JSON Response Card -->
        <div class="glass-card">
            <div class="card-header">
                <div class="card-title">
                    <span>⚡ Live Root Metadata (GET /)</span>
                </div>
                <span class="card-badge">STATUS: 200 OK</span>
            </div>
            <div class="json-box">
                <button class="copy-btn" onclick="copyJson()">Copy JSON</button>
                <pre id="json-code">{json.dumps(json_data, indent=2)}</pre>
            </div>
        </div>

        <!-- 2. Connected Multi-Agent Pipeline Card -->
        <div class="glass-card">
            <div class="card-header">
                <div class="card-title">
                    <span>🤖 Connected Multi-Agent Pipeline</span>
                </div>
                <span class="card-badge">SEQUENTIAL DAG</span>
            </div>
            <div class="pipeline-grid">
                <div class="agent-node">
                    <div class="agent-node-top">
                        <span class="agent-step-tag">Step 1</span>
                        <span style="color: #34d399; font-size: 11px; font-weight: 700;">{'LIVE' if has_tavily else 'HYBRID'}</span>
                    </div>
                    <span class="agent-name">Web Search Agent</span>
                    <p class="agent-role">Scrapes real-time web indexes for competitors, industry benchmarks, and market URLs.</p>
                </div>

                <div class="agent-node">
                    <div class="agent-node-top">
                        <span class="agent-step-tag">Step 2</span>
                        <span style="color: #60a5fa; font-size: 11px; font-weight: 700;">ACTIVE</span>
                    </div>
                    <span class="agent-name">Market Opportunity Agent</span>
                    <p class="agent-role">Synthesizes TAM/SAM/SOM sizing bounds, CAGR trends, customer personas, and buying behaviors.</p>
                </div>

                <div class="agent-node">
                    <div class="agent-node-top">
                        <span class="agent-step-tag">Step 3</span>
                        <span style="color: #a78bfa; font-size: 11px; font-weight: 700;">ACTIVE</span>
                    </div>
                    <span class="agent-name">Competitor Discovery Agent</span>
                    <p class="agent-role">Profiles direct incumbents, builds multi-axis matrices, and surfaces market white spaces.</p>
                </div>

                <div class="agent-node">
                    <div class="agent-node-top">
                        <span class="agent-step-tag">Step 4</span>
                        <span style="color: #f472b6; font-size: 11px; font-weight: 700;">ACTIVE</span>
                    </div>
                    <span class="agent-name">Executive Orchestrator</span>
                    <p class="agent-role">Tracks pipeline audit timings, generates feasibility scores, and unifies response payload.</p>
                </div>
            </div>
        </div>

        <!-- 3. Interactive API Playground -->
        <div class="glass-card">
            <div class="card-header">
                <div class="card-title">
                    <span>🧪 Live API Validation Playground (POST /validate)</span>
                </div>
                <span class="card-badge">DIRECT TEST</span>
            </div>
            
            <div class="input-box" style="margin-bottom: 12px;">
                <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; font-weight: 700;">STARTUP VALUE PROPOSITION & IDEA</label>
                <textarea id="testIdea" rows="2">An on-demand veterinary telehealth platform with instant AI triage and symptom detection from smartphone photos.</textarea>
            </div>

            <div class="tester-inputs">
                <div class="input-box">
                    <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; font-weight: 700;">INDUSTRY VERTICAL</label>
                    <input id="testIndustry" type="text" value="Pet Care & HealthTech">
                </div>
                <div class="input-box">
                    <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; font-weight: 700;">TARGET AUDIENCE</label>
                    <input id="testMarket" type="text" value="Pet owners, veterinary clinics">
                </div>
            </div>

            <button type="button" id="runTestBtn" onclick="runLiveValidation()" class="btn btn-primary">
                <span>⚡ Execute Multi-Agent Validation</span>
            </button>

            <div id="testOutputBox" class="test-output"></div>
        </div>

        <div class="footer">
            <p>© 2026 VenturePulse. All rights reserved. • Multi-Agent Intelligence Engine</p>
        </div>
    </div>

    <script>
        function copyJson() {{
            const code = document.getElementById('json-code').innerText;
            navigator.clipboard.writeText(code);
            const btn = document.querySelector('.copy-btn');
            btn.innerText = 'Copied!';
            setTimeout(() => btn.innerText = 'Copy JSON', 2000);
        }}

        async function runLiveValidation() {{
            const idea = document.getElementById('testIdea').value;
            const industry = document.getElementById('testIndustry').value;
            const market = document.getElementById('testMarket').value;
            const outBox = document.getElementById('testOutputBox');
            const btn = document.getElementById('runTestBtn');

            btn.innerText = '⏳ Executing 3-Agent Pipeline...';
            btn.disabled = true;
            outBox.style.display = 'block';
            outBox.innerText = 'Connecting to multi-agent orchestrator pipeline (WebSearch ➔ MarketOpportunity ➔ CompetitorDiscovery)...';

            try {{
                const res = await fetch('/validate', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{
                        startup_idea: idea,
                        industry: industry,
                        target_market: market
                    }})
                }});
                const data = await res.json();
                outBox.innerText = JSON.stringify(data, null, 2);
            }} catch (err) {{
                outBox.innerText = 'Error executing pipeline: ' + err.message;
            }} finally {{
                btn.innerText = '⚡ Execute Multi-Agent Validation';
                btn.disabled = false;
            }}
        }}
    </script>
</body>
</html>"""
    return HTMLResponse(content=html_content)

class ExportReportRequest(BaseModel):
    validation_data: dict = Field(..., description="Full validation response dictionary or dossier")
    export_format: str = Field(default="markdown", description="'markdown', 'json', or 'html'")

@app.get("/health")
def health():
    return {"status": "ok", "version": "4.0.0"}

@app.get("/agents")
def get_agents():
    """
    Returns the metadata and documentation for all configured agents in the system.
    """
    print("🤖 [API GET /agents] Agent architecture metadata requested.")
    return {
        "version": "4.0.0",
        "pipeline": [
            {
                "id": "web_search_agent",
                "name": "Web Search & Market Index Agent",
                "milestone": 1,
                "role": "Scrapes real-time web indexes for competitors, industry benchmarks, and live market records."
            },
            {
                "id": "market_opportunity_agent",
                "name": "Market Opportunity & Customer Segmentation Agent",
                "milestone": 2,
                "role": "Synthesizes market size (TAM/SAM/SOM), CAGR growth rate, customer personas, and buying behaviors."
            },
            {
                "id": "competitor_discovery_agent",
                "name": "Competitor Discovery & Comparison Agent",
                "milestone": 2,
                "role": "Identifies direct/indirect players, creates comparative feature matrices, and highlights market white spaces."
            },
            {
                "id": "swot_risk_agent",
                "name": "SWOT & Risk Analysis Agent",
                "milestone": 3,
                "role": "Generates structured SWOT vectors and multi-category risk assessments with concrete mitigation playbooks."
            },
            {
                "id": "mvp_feature_agent",
                "name": "MVP Feature Recommendation Agent",
                "milestone": 3,
                "role": "Prioritizes core product features using MoSCoW and Effort vs Impact matrices for 30/60 day build sprints."
            },
            {
                "id": "gtm_strategy_agent",
                "name": "Go-To-Market Strategy Agent",
                "milestone": 3,
                "role": "Formulates positioning statement, acquisition channel CAC dynamics, First 100 Customers playbook, and launch phases."
            },
            {
                "id": "validation_report_agent",
                "name": "Startup Validation Report Generation Agent",
                "milestone": 4,
                "role": "Compiles executive dossiers into structured markdown, JSON scorecards, and publication-ready investor reports."
            },
            {
                "id": "conversational_advisor_agent",
                "name": "Conversational Startup Advisor Agent",
                "milestone": 3,
                "role": "Engages in interactive, multi-turn consultation on unit economics, GTM execution, and defensibility."
            }
        ]
    }

@app.post("/export/report")
def export_report(request: ExportReportRequest):
    """
    Milestone 4 Export Endpoint:
    Exports startup validation dossier in Markdown, JSON, or HTML printable format.
    """
    data = request.validation_data
    if not data:
        raise HTTPException(status_code=400, detail="Validation data payload is required.")

    fmt = request.export_format.lower()
    startup_name = data.get("startup_idea", "startup").replace(" ", "_")[:24]
    
    # Extract or generate markdown report
    rep = data.get("validation_report", {})
    md_report = rep.get("markdown_report")
    if not md_report:
        # Generate on the fly using report agent
        from services.report_agent import ValidationReportAgent
        r_agent = ValidationReportAgent(llm_service=orchestrator.llm_service)
        compiled = r_agent.generate_report(data)
        md_report = compiled.get("markdown_report", "")

    if fmt == "json":
        return {
            "format": "json",
            "filename": f"venturepulse_{startup_name}_dossier.json",
            "content": data
        }
    elif fmt == "html":
        # Simple styled HTML wrapping markdown or raw summary
        title = data.get("startup_idea", "VenturePulse Dossier")
        html_doc = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>{title} - Validation Dossier</title>
<style>
body {{ font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 0 20px; }}
h1, h2, h3 {{ color: #0f172a; }}
table {{ border-collapse: collapse; width: 100%; margin: 20px 0; }}
th, td {{ border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }}
th {{ background-color: #f1f5f9; }}
pre, code {{ background: #f8fafc; padding: 2px 6px; border-radius: 4px; font-family: monospace; }}
</style>
</head>
<body>
<pre style="white-space: pre-wrap; font-family: inherit;">{md_report}</pre>
</body>
</html>"""
        return {
            "format": "html",
            "filename": f"venturepulse_{startup_name}_report.html",
            "content": html_doc
        }
    else:
        # Default Markdown
        return {
            "format": "markdown",
            "filename": f"venturepulse_{startup_name}_report.md",
            "content": md_report
        }

@app.post("/advisor/chat")
def advisor_chat(request: AdvisorChatRequest):
    """
    Milestone 3 Conversational Advisor Endpoint:
    Processes user follow-up questions in the context of the validated startup dossier.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    try:
        response = advisor_agent.chat(
            user_message=request.message.strip(),
            history=request.history,
            validation_context=request.validation_context
        )
        return response
    except Exception as e:
        print(f"❌ [API ERROR] Advisor chat failed: {e}")
        raise HTTPException(status_code=500, detail=f"Advisor chat error: {str(e)}")

@app.post("/chat")
def chat_alias(request: AdvisorChatRequest):
    """Alias endpoint for conversational advisor."""
    return advisor_chat(request)

@app.post("/validate")
def validate_startup_idea(request: StartupValidationRequest):
    """
    Milestone 2 Core Endpoint:
    Executes the end-to-end multi-agent pipeline:
    1. Queries live web index for competitor and market records (Web Search Agent)
    2. Extracts market size, growth rates, and customer segmentation (Market Agent)
    3. Builds competitor matrix and identifies market white spaces (Competitor Agent)
    """
    if not request.startup_idea.strip() or not request.industry.strip() or not request.target_market.strip():
        raise HTTPException(
            status_code=400, 
            detail="Startup idea, industry, and target market cannot be empty or whitespace."
        )

    try:
        print(f"\n📡 [API POST /validate] Incoming request for '{request.startup_idea[:45]}...'")
        pipeline_output = orchestrator.run_pipeline(
            startup_idea=request.startup_idea.strip(),
            industry=request.industry.strip(),
            target_market=request.target_market.strip()
        )
        return pipeline_output
    except Exception as e:
        print(f"❌ [API ERROR] Error during pipeline execution: {e}")
        raise HTTPException(status_code=500, detail=f"Pipeline execution failed: {str(e)}")

@app.post("/search")
def search_startup(request: StartupValidationRequest):
    """
    Alias / backwards-compatible endpoint for existing UI clients.
    Runs the full multi-agent pipeline and returns unified results.
    """
    return validate_startup_idea(request)

# ==============================================================================
# Customer Discovery & Standalone Survey Engine (Milestone 4 Extension)
# ==============================================================================

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)
SURVEYS_FILE = os.path.join(DATA_DIR, "surveys.json")

def _load_surveys() -> dict:
    if os.path.exists(SURVEYS_FILE):
        try:
            with open(SURVEYS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def _save_surveys(data: dict):
    try:
        with open(SURVEYS_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving surveys: {e}")

class CreateSurveyRequest(BaseModel):
    startup_idea: str = Field(..., min_length=3)
    industry: str = Field(..., min_length=2)
    target_market: str = Field(..., min_length=2)
    founder_name: str = Field(default="Founder")
    custom_pitch: str = Field(default="")

class SubmitSurveyResponseRequest(BaseModel):
    respondent_name: str = Field(default="Anonymous Explorer")
    problem_frequency: str = Field(..., description="Daily, Weekly, Monthly, Rarely, Never")
    current_solution: str = Field(default="Manual workaround")
    rating: int = Field(..., ge=1, le=5, description="Utility rating 1-5")
    willingness_to_pay: str = Field(..., description="Pricing bracket willingness")
    feedback: str = Field(default="")

@app.post("/survey/create")
def create_survey(request: CreateSurveyRequest):
    """
    Generates a unique, shareable survey for a startup concept.
    """
    import hashlib
    import time
    surveys = _load_surveys()
    
    seed = f"{request.startup_idea}_{request.industry}_{time.time()}"
    survey_id = "vp_" + hashlib.md5(seed.encode()).hexdigest()[:8]
    
    survey_obj = {
        "id": survey_id,
        "startup_idea": request.startup_idea,
        "industry": request.industry,
        "target_market": request.target_market,
        "founder_name": request.founder_name,
        "custom_pitch": request.custom_pitch or f"We are building a solution for {request.target_market} in {request.industry}: {request.startup_idea}",
        "created_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "responses": []
    }
    
    surveys[survey_id] = survey_obj
    _save_surveys(surveys)
    
    return {
        "status": "success",
        "survey_id": survey_id,
        "survey": survey_obj,
        "message": "Survey created successfully! Share this link with potential customers."
    }

@app.get("/survey/{survey_id}")
def get_survey(survey_id: str):
    """
    Retrieves public survey metadata for end-users to answer questions.
    """
    surveys = _load_surveys()
    if survey_id in surveys:
        survey = surveys[survey_id]
        return {
            "id": survey["id"],
            "startup_idea": survey["startup_idea"],
            "industry": survey["industry"],
            "target_market": survey["target_market"],
            "founder_name": survey.get("founder_name", "Founding Team"),
            "custom_pitch": survey.get("custom_pitch", ""),
            "created_at": survey.get("created_at", ""),
            "response_count": len(survey.get("responses", []))
        }

    # Preset ideas lookup by ID prefix/keyword
    KNOWN_PRESETS = {
        "anautomate": {
            "startup_idea": "An automated cash flow intelligence and instant invoice factoring platform tailored for SMB contractors.",
            "industry": "FinTech & SMB Banking",
            "target_market": "Small business owners, general contractors, freelancers"
        },
        "anondemand": {
            "startup_idea": "An on-demand veterinary telehealth platform with instant AI triage and symptom detection from smartphone photos.",
            "industry": "Pet Care & HealthTech",
            "target_market": "Pet owners, veterinary clinics, animal shelters"
        },
        "anai-pow": {
            "startup_idea": "An AI-powered route planning app for electric cargo bike deliveries in dense urban areas.",
            "industry": "Green Logistics & Mobility",
            "target_market": "Local e-commerce shops, urban couriers, micro-hubs"
        },
        "anintell": {
            "startup_idea": "An intelligent learning copilot that converts college lectures and PDF textbooks into interactive flashcards, quizzes, and mock tests.",
            "industry": "EdTech & Higher Education",
            "target_market": "University students, certification exam candidates"
        }
    }

    clean_key = survey_id.replace("vp_", "").lower()
    for key, val in KNOWN_PRESETS.items():
        if key in clean_key or clean_key in key:
            return {
                "id": survey_id,
                "startup_idea": val["startup_idea"],
                "industry": val["industry"],
                "target_market": val["target_market"],
                "founder_name": "Founding Team",
                "custom_pitch": f"We are validating {val['startup_idea']} for {val['target_market']}.",
                "created_at": "Active",
                "response_count": 0
            }

    # Fallback default
    return {
        "id": survey_id,
        "startup_idea": "AI Powered Startup Concept Validation",
        "industry": "Technology & Software",
        "target_market": "Early Adopters & Product Users",
        "founder_name": "Founding Team",
        "custom_pitch": "We are building an innovative platform. We would love your honest 30-second feedback!",
        "created_at": "Active",
        "response_count": 0
    }

@app.post("/survey/{survey_id}/submit")
def submit_survey_response(survey_id: str, response: SubmitSurveyResponseRequest):
    """
    Records an end-user's response to the startup survey.
    """
    import time
    surveys = _load_surveys()
    
    if survey_id not in surveys:
        # Create ad-hoc survey record if not exists
        surveys[survey_id] = {
            "id": survey_id,
            "startup_idea": "Startup Concept",
            "industry": "Technology",
            "target_market": "General Audience",
            "created_at": time.strftime("%Y-%m-%d %H:%M:%S"),
            "responses": []
        }
    
    entry = {
        "id": f"resp_{len(surveys[survey_id]['responses']) + 1}",
        "respondent_name": response.respondent_name.strip() or "Anonymous Explorer",
        "problem_frequency": response.problem_frequency,
        "current_solution": response.current_solution,
        "rating": response.rating,
        "willingness_to_pay": response.willingness_to_pay,
        "feedback": response.feedback.strip(),
        "submitted_at": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    
    surveys[survey_id]["responses"].append(entry)
    _save_surveys(surveys)
    
    return {
        "status": "success",
        "message": "Thank you for validating this startup concept!",
        "response_id": entry["id"],
        "total_responses": len(surveys[survey_id]["responses"])
    }

@app.get("/survey/{survey_id}/responses")
def get_survey_responses(survey_id: str):
    """
    Returns aggregated feedback metrics and individual responses for the founder.
    """
    surveys = _load_surveys()
    survey = surveys.get(survey_id, {})
    responses = survey.get("responses", [])
    
    count = len(responses)
    if count == 0:
        return {
            "survey_id": survey_id,
            "response_count": 0,
            "average_rating": 0.0,
            "frequency_breakdown": {},
            "wtp_breakdown": {},
            "responses": []
        }
    
    avg_rating = round(sum(r.get("rating", 0) for r in responses) / count, 1)
    
    freq_map = {}
    wtp_map = {}
    for r in responses:
        freq = r.get("problem_frequency", "Unknown")
        freq_map[freq] = freq_map.get(freq, 0) + 1
        
        wtp = r.get("willingness_to_pay", "Unknown")
        wtp_map[wtp] = wtp_map.get(wtp, 0) + 1
    
    return {
        "survey_id": survey_id,
        "response_count": count,
        "average_rating": avg_rating,
        "frequency_breakdown": freq_map,
        "wtp_breakdown": wtp_map,
        "responses": responses
    }