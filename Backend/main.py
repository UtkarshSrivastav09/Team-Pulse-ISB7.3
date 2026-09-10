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

# Load environment variables
load_dotenv(override=True)

app = FastAPI(
    title="VenturePulse - AI Startup Idea Validator & Market Intelligence API",
    description="Backend API powering VenturePulse Multi-Agent Startup Validator: Web Search Agent -> Market Opportunity Agent -> Competitor Discovery Agent.",
    version="2.0.0"
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

# Pydantic request model for input validation
class StartupValidationRequest(BaseModel):
    startup_idea: str = Field(..., min_length=3, description="Core startup idea or description")
    industry: str = Field(..., min_length=2, description="The market industry or domain")
    target_market: str = Field(..., min_length=2, description="The target audience or customer base")

@app.on_event("startup")
def print_startup_banner():
    """
    Prints executive terminal banner on API startup showing connected agents and routes.
    """
    has_tavily = search_service._get_tavily_client()[1]
    print("\n" + "=" * 72)
    print("🚀 [VENTUREPULSE] Multi-Agent Startup Intelligence Engine (v2.0.0)")
    print("=" * 72)
    print(f"📡 Search Index Connection: {'[LIVE TAVILY CONNECTED]' if has_tavily else '[ENTERPRISE SIMULATION / HYBRID]'}")
    print("🤖 4 Active Connected Intelligence Agents:")
    print("   ├─ [1] WebSearchAgent (Market Scraping & Live Web Indexing)")
    print("   ├─ [2] MarketOpportunityAgent (TAM/SAM/SOM Bounds & Customer Segmentation)")
    print("   ├─ [3] CompetitorDiscoveryAgent (2x2 Matrix & Market White Spaces)")
    print("   └─ [4] AgentPipelineOrchestrator (Sequential Execution & Synthesis)")
    print("⚡ Active REST Endpoints:")
    print("   ├─ GET  /         -> Multi-Agent API Status & Developer Portal")
    print("   ├─ GET  /agents   -> Agent Pipeline Architecture Metadata")
    print("   ├─ GET  /health   -> Service Healthcheck (200 OK)")
    print("   └─ POST /validate -> Multi-Agent Autonomous Validation Pipeline")
    print("=" * 72 + "\n")

@app.get("/")
def home(request: Request, format: str = None):
    has_tavily = bool(search_service._get_tavily_client()[1])
    
    json_data = {
        "message": "VenturePulse Multi-Agent API is active (v2.0.0)",
        "version": "2.0.0",
        "search_index_connected": has_tavily,
        "active_agents": [
            "WebSearchAgent (Milestone 1)",
            "MarketOpportunityAgent (Milestone 2)",
            "CompetitorDiscoveryAgent (Milestone 2)",
            "AgentPipelineOrchestrator (Milestone 2)"
        ],
        "endpoints": {
            "validate": "POST /validate",
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

@app.get("/health")
def health():
    return {"status": "ok", "version": "2.0.0"}

@app.get("/agents")
def get_agents():
    """
    Returns the metadata and documentation for all configured agents in the system.
    """
    print("🤖 [API GET /agents] Agent architecture metadata requested.")
    return {
        "pipeline": [
            {
                "id": "web_search_agent",
                "name": "Web Search & Market Index Agent",
                "milestone": 1,
                "role": "Scrapes real-time web indexes for competitors, industry benchmarks, and solutions."
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
                "id": "agent_orchestrator",
                "name": "Agent Pipeline Orchestrator",
                "milestone": 2,
                "role": "Executes sequential DAG pipeline, captures performance timings, and synthesizes executive dossier."
            }
        ]
    }

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