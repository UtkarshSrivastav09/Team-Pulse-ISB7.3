# VenturePulse — AI Startup Idea Validator & Market Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB?logo=react&logoColor=black)](https://team-pulse-isb-7-3.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI_v4.0-009688?logo=fastapi&logoColor=white)](https://team-pulse-isb7-3.onrender.com/)
[![Multi-Agent](https://img.shields.io/badge/Agents-8_Autonomous_Engines-8A2BE2)](#-autonomous-multi-agent-system)
[![Pipeline Latency](https://img.shields.io/badge/Pipeline_Speed-5.7s_Live-brightgreen)](#-ultra-fast-pipeline-performance)

**VenturePulse** is an institutional-grade autonomous multi-agent web platform designed to validate startup concepts, analyze market feasibility, compute TAM/SAM/SOM sizing bounds, benchmark competitor landscapes, synthesize SWOT/risk playbooks, prioritize MVP roadmaps, generate go-to-market strategies, and compile comprehensive investment dossiers in real time. Built as part of **Infosys Springboard 7.0 (Batch 3) by Team Pulse**.

---

## 🚀 Live Deployments

Explore the live production environments of **VenturePulse** below:

| Deployment Component | Platform | URL Link | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Dashboard Client** | [![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://team-pulse-isb-7-3.vercel.app/) | [https://team-pulse-isb-7-3.vercel.app](https://team-pulse-isb-7-3.vercel.app/) | ![Active](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square) |
| **FastAPI Backend Web Service** | [![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://team-pulse-isb7-3.onrender.com/) | [https://team-pulse-isb7-3.onrender.com](https://team-pulse-isb7-3.onrender.com/) | ![Active](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square) |
| **Interactive API Documentation** | [![Swagger API Docs](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)](https://team-pulse-isb7-3.onrender.com/docs) | [https://team-pulse-isb7-3.onrender.com/docs](https://team-pulse-isb7-3.onrender.com/docs) | ![Active](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square) |

---

## ⚡ Project Overview

Starting a business requires exhaustive market research, competitor benchmarking, risk mitigation, and go-to-market planning. VenturePulse automates this entire diligence lifecycle into a **5–6 second concurrent multi-agent pipeline**:

1. **Founder inputs** startup concept, targeted industry vertical, and customer segment.
2. **Agent 1 (Web Search Agent)** queries real-time web search indices for competitor records, pricing models, and industry data.
3. **Agent 2 (Market Opportunity Agent)** computes TAM/SAM/SOM market sizing, CAGR growth rates, buyer vs end-user personas, core pain points, and willingness to pay.
4. **Agent 3 (Competitor Discovery Agent)** benchmarks direct/indirect players, constructs an interactive positioning matrix, and isolates market white spaces.
5. **Agent 4 (SWOT & Risk Analysis Agent)** generates structured SWOT vectors and multi-category risk assessments (Tech, Market, Legal, Financial) with actionable mitigation playbooks.
6. **Agent 5 (MVP Feature Recommendation Agent)** prioritizes core features using the MoSCoW framework (*Must-Have*, *Should-Have*, *Could-Have*, *Won't-Have*) and Effort vs Impact scoring.
7. **Agent 6 (Go-To-Market Strategy Agent)** formulates strategic positioning, customer acquisition channels with CAC estimates, and a "First 100 Customers" traction playbook.
8. **Agent 7 (Validation Report Generation Agent)** compiles an Executive Investment Feasibility Scorecard (0–100%) and publishes comprehensive Markdown, PDF, and JSON dossiers.
9. **Agent 8 (Conversational Venture Copilot)** delivers interactive, context-aware consultation on unit economics, pricing models, and defensibility.

---

## ⚡ Ultra-Fast Pipeline Performance

While traditional sequential pipelines take **60+ seconds**, VenturePulse employs **Dependency-Optimized Concurrent Multi-Threading** (`ThreadPoolExecutor`), completing full institutional validation in **under 6 seconds**:

| Step | Autonomous Agent | Concurrency Batch | Live Latency | Status |
| :---: | :--- | :---: | :---: | :---: |
| **1** | **WebSearchAgent** | Sequential (Data Ingest) | `~4.6s` | Live Tavily Web Search |
| **2** | **MarketOpportunityAgent** | **Parallel Batch 1** | `~0.5s` | Live / Parallel Thread |
| **3** | **CompetitorDiscoveryAgent** | **Parallel Batch 1** | `~0.5s` | Live / Parallel Thread |
| **4** | **SWOTRiskAgent** | **Parallel Batch 2** | `~0.4s` | Live / Parallel Thread |
| **5** | **MVPFeatureAgent** | **Parallel Batch 2** | `~0.4s` | Live / Parallel Thread |
| **6** | **GTMStrategyAgent** | **Parallel Batch 2** | `~0.4s` | Live / Parallel Thread |
| **7** | **ValidationReportAgent** | Final Synthesis | `~0.0s` | Instant In-Memory Dossier |
| **Total** | **All 7 Validation Agents** | **Full Pipeline** | **`~5.7s`** | ✅ Institutional Speed |

*(When running in local/heuristic simulation mode, the entire pipeline executes in **< 1.0 second**).*

---

## 🌟 Milestone 4 Core Features

* **8-Agent Autonomous Pipeline**: Dependency DAG execution with parallel multi-threading for sub-6-second end-to-end execution.
* **Executive Feasibility Scorecard**: Comprehensive 0–100% investment readiness metric with weighted sub-scores across market demand, competitive moat, tech viability, and risk tolerance.
* **1-Click Multiformat Exports**:
  * **PDF Dossier**: Formatted, print-ready investment report with typography and scorecard metrics.
  * **Markdown Report**: Complete multi-section research dossier ready for GitHub or documentation wikis.
  * **Structured JSON**: Complete machine-readable data payload for downstream APIs.
* **Saved Validation Vault**: Local storage persistence enabling instant reload and deletion of past startup validations.
* **Customer Discovery & Community Survey Engine**: Dedicated survey generator (`GET /surveys`, `POST /surveys`, `POST /surveys/submit`) allowing founders to collect live user feedback and community validation.
* **Architecture HUD Inspector**: Deep inspection modal detailing execution engines, latencies, schemas, inputs, and outputs for all 8 agents.
* **Resilient Multi-LLM Layer**: Automatic failover across Google Gemini 1.5/2.0 Flash, Groq Llama 3.1/3.3, OpenAI GPT-4o-mini, and high-speed local domain heuristics.
* **Interactive Enterprise UI**: Built with React 19, Vanilla CSS design tokens, dark/light theme switching, and fluid responsive layouts.

---

## 🏗️ Multi-Agent System Architecture

<div align="center">
  <img src="docs/assets/system_architecture.png" alt="VenturePulse Multi-Agent System Architecture" width="100%" />
  <p><em>Figure 1: VenturePulse Multi-Agent Concurrent Validation Pipeline Architecture (Sub-6s End-to-End)</em></p>
</div>

<details>
<summary><b>🔍 Click to view Architecture Execution Flow Breakdown</b></summary>
<br />

1. **Client Tier**: Founder enters idea $\rightarrow$ React 19 Client dispatches concurrent async payload.
2. **Gateway & Orchestration**: FastAPI server delegates validation payload to the `Concurrent Pipeline Orchestrator` (`ThreadPoolExecutor`).
3. **Step 1 (Ingest)**: `WebSearchAgent` indexes Tavily search queries for active market players, customer reviews, and pricing tiers.
4. **Step 2 (Parallel Batch 1)**: `MarketOpportunityAgent` (TAM/SAM/SOM sizing) and `CompetitorDiscoveryAgent` (2x2 matrix & white spaces) execute simultaneously in ~0.5s.
5. **Step 3 (Parallel Batch 2)**: `SWOTRiskAgent`, `MVPFeatureAgent`, and `GTMStrategyAgent` execute simultaneously in ~0.4s.
6. **Step 4 (Synthesis)**: `ValidationReportAgent` in-memory compiles the 0–100% Executive Feasibility Scorecard, Markdown Dossier, and JSON export.
7. **Step 5 (Advisory Copilot)**: `ConversationalAdvisorAgent` provides interactive context-aware consultation on unit economics and strategy.

</details>

---

## 📁 Repository Structure

```
Team-Pulse-ISB7.3/
├── Backend/                         # Python FastAPI API Server (v4.0.0)
│   ├── data/
│   │   └── surveys.json             # Persistent Community Survey Storage
│   ├── services/                    # Autonomous Multi-Agent Architecture
│   │   ├── search_service.py        # Agent 1: WebSearchAgent (Tavily Index)
│   │   ├── market_agent.py          # Agent 2: MarketOpportunityAgent (TAM/SAM/SOM)
│   │   ├── competitor_agent.py      # Agent 3: CompetitorDiscoveryAgent (Benchmarking)
│   │   ├── swot_risk_agent.py       # Agent 4: SWOTRiskAgent (SWOT & Risk Mitigations)
│   │   ├── mvp_agent.py             # Agent 5: MVPFeatureAgent (MoSCoW Prioritization)
│   │   ├── gtm_agent.py             # Agent 6: GTMStrategyAgent (Acquisition Channels)
│   │   ├── report_agent.py          # Agent 7: ValidationReportAgent (Executive Scorecard)
│   │   ├── advisor_agent.py         # Agent 8: Conversational Venture Copilot
│   │   ├── llm_service.py           # Multi-LLM Adapter (Gemini/Groq/OpenAI/Heuristics)
│   │   └── orchestrator.py          # High-Performance Concurrent Multi-Threaded Engine
│   ├── test_pipeline.py             # Automated 8-Agent Test Suite (3 Diverse Concepts)
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Backend-specific ignore file
│   ├── main.py                      # FastAPI routes, CORS, validation & survey endpoints
│   └── requirements.txt             # Python backend dependencies
├── frontend/                        # React 19 Client Application (Vite)
│   ├── public/                      # Static assets & web manifest
│   │   └── favicon.svg
│   ├── src/                         # Frontend application source
│   │   ├── assets/                  # Brand assets & vector graphics
│   │   │   └── venturepulse_brand_title.png
│   │   ├── App.css                  # Enterprise Design System & HUD Styles
│   │   ├── App.jsx                  # Main Dashboard, Multi-Agent Views, Vault & Surveys
│   │   ├── index.css                # Global CSS tokens & font imports
│   │   └── main.jsx                 # React root mount
│   ├── index.html                   # HTML5 Entry template
│   ├── package.json                 # Node dependencies and build scripts
│   ├── vercel.json                  # Vercel SPA routing configuration
│   └── vite.config.js               # Vite build configuration
├── docs/                            # Project documentation
│   ├── system-architecture.md        # Architectural blueprint & Data Schemas
│   ├── agile-development-document.md # Sprint plans, velocity & retrospectives
│   └── presentation-deck.md         # Final Pitch Deck & Demo Walkthrough
├── LICENSE                          # MIT Open-Source License
└── README.md                        # Project documentation index
```

---

## ⚡ Getting Started

### Prerequisites
* Python 3.8 or higher
* Node.js (v18 or higher) and npm

### 1. Setup & Run the Backend
Navigate to the `Backend` directory:
```bash
cd Backend
```

Install Python dependencies:
```bash
python -m pip install -r requirements.txt
```

*(Optional)* Configure API credentials in a `.env` file:
```env
TAVILY_API_KEY=tvly-your_tavily_key_here
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here
```
*Note: If no API keys are configured, the platform runs autonomously in intelligent domain simulation mode with 0 crashes.*

Run the automated test suite across 3 diverse industry concepts:
```bash
python test_pipeline.py
```

Start the FastAPI server:
```bash
python -m uvicorn main:app --reload --port 8000
```
Interactive Swagger API documentation is available at `http://127.0.0.1:8000/docs`.

### 2. Setup & Run the Frontend
Navigate to the `frontend` directory in a new terminal:
```bash
cd frontend
```

Install Node modules:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🧪 Validated Startup Concepts (Automated Test Suite)

The multi-agent pipeline is continuously tested and verified on 3 distinct test concepts:

1. **Pet Care & HealthTech**: *"An on-demand veterinary telehealth platform with instant AI triage and symptom detection from smartphone photos."*
   - TAM: $42.5 Billion | 2 Direct Competitors | 3 White Spaces | 6-Week MVP | Feasibility: 87%
2. **Green Logistics & Mobility**: *"An AI-powered route planning app for electric cargo bike deliveries in dense urban areas."*
   - TAM: $28.4 Billion | 2 Direct Competitors | 3 White Spaces | 6-Week MVP | Feasibility: 94%
3. **EdTech & Higher Education**: *"An intelligent learning copilot that converts college lectures and PDF textbooks into interactive flashcards, quizzes, and mock tests."*
   - TAM: $31.8 Billion | 2 Direct Competitors | 3 White Spaces | 6-Week MVP | Feasibility: 84%

---

## 📡 REST API Reference

The backend provides production-ready REST endpoints documented interactively via Swagger UI (`/docs`) and ReDoc (`/redoc`):

### 1. Execute Validation Pipeline (`POST /validate`)
Runs the full concurrent 7-agent market intelligence pipeline.

* **Request Body (`application/json`):**
```bash
curl -X POST "http://localhost:8000/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "startup_idea": "An on-demand veterinary telehealth platform with instant AI triage and symptom detection from smartphone photos.",
    "industry": "Pet Care & HealthTech",
    "target_market": "Pet owners, veterinary clinics"
  }'
```

* **Response Payload Highlights (`HTTP 200 OK`):**
```json
{
  "startup_idea": "An on-demand veterinary telehealth platform...",
  "industry": "Pet Care & HealthTech",
  "target_market": "Pet owners, veterinary clinics",
  "pipeline_metadata": {
    "total_duration_sec": 5.73,
    "pipeline_version": "4.0.0",
    "agents_executed": [
      "WebSearchAgent",
      "MarketOpportunityAgent",
      "CompetitorDiscoveryAgent",
      "SWOTRiskAgent",
      "MVPFeatureAgent",
      "GTMStrategyAgent",
      "ValidationReportAgent"
    ]
  },
  "market_analysis": {
    "market_summary": "High-velocity pet healthtech sector...",
    "market_size_and_growth": {
      "tam_estimate": "$42.5 Billion Global Market",
      "sam_estimate": "$6.8 Billion Regional Segment",
      "som_estimate": "$340 Million Beachhead Market",
      "cagr_growth_rate": "14.2% CAGR (2024-2030)"
    }
  },
  "competitor_analysis": { ... },
  "swot_analysis": { ... },
  "mvp_roadmap": { ... },
  "gtm_strategy": { ... },
  "validation_report": {
    "executive_scorecard": {
      "overall_feasibility_score": 87,
      "verdict": "STRONG VENTURE OPPORTUNITY",
      "investment_grade": "A-"
    },
    "comprehensive_markdown_report": "# VenturePulse Executive Dossier..."
  }
}
```

---

### 2. Conversational Venture Copilot (`POST /advisor/chat`)
Interactive advisory session maintaining validation context.

```bash
curl -X POST "http://localhost:8000/advisor/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What pricing strategy should I use to maximize Day-1 retention?",
    "history": [],
    "validation_context": { "startup_idea": "...", "industry": "..." }
  }'
```

---

### 3. Community Surveys & Customer Discovery (`/surveys`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/surveys` | Fetch all active founder discovery surveys |
| `POST` | `/surveys` | Create a new community feedback survey |
| `POST` | `/surveys/submit` | Submit anonymous customer feedback responses |
| `GET` | `/health` | Health check and server status |

---

## ⚙️ Environment Variables & Configuration

VenturePulse features an **intelligent multi-provider AI resilience layer**. If no third-party keys are provided, the platform automatically engages its heuristic domain synthesis engine with 0 crashes:

| Variable | Description | Default Fallback |
| :--- | :--- | :--- |
| `TAVILY_API_KEY` | Real-time web crawling & competitor indexing | High-fidelity domain heuristics |
| `GEMINI_API_KEY` | Google Gemini 1.5 / 2.0 Flash REST engine | Groq / Heuristic strategic adapter |
| `GROQ_API_KEY` | Ultra-low latency Llama-3 inference | Gemini / Heuristic strategic adapter |
| `OPENAI_API_KEY` | OpenAI GPT-4o-mini secondary fallback | Gemini / Heuristic strategic adapter |
| `PORT` | FastAPI server listening port | `8000` |
| `CORS_ORIGINS` | Permitted client origins for CORS | `["*"]` |

---

## 👥 Team & Leadership

* **[Utkarsh Srivastav](https://github.com/UtkarshSrivastav09)** — **Team Lead & Full Stack Developer**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2026 Utkarsh Srivastav (Team Pulse) — VenturePulse
```

---

Developed with ❤️ by **Team Pulse** for Infosys Springboard 7.0 Batch 3.