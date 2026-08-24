# System Architecture

This document outlines the system architecture, component roles, and data flow for the **Development of AI Based Startup Idea Validator with Market Analysis Assistance** project.

## Architecture Flow

The following diagram illustrates the end-to-end data flow:

```mermaid
graph TD
    User([User])
    UI[Web Interface - React & Vite]
    API[Backend API - FastAPI]
    WSA[Web Search Service]
    Tavily[Search Index API]

    User -->|Enters startup details| UI
    UI -->|Sends JSON POST /search| API
    API -->|Invokes with query parameters| WSA
    WSA -->|Formulates & Executes query| Tavily
    Tavily -->|Returns raw search web data| WSA
    WSA -->|Formats & Filters results| API
    API -->|Returns HTTP 200 JSON payload| UI
    UI -->|Displays results list & insights| User
```

## Component Roles & Responsibilities

| Component | Role | Description |
| :--- | :--- | :--- |
| **Frontend** | Collect details & display results | A React + Vite single page application that provides a clean user interface. It collects startup name, industry, target market, and description, communicates with the backend, and displays the structured results. |
| **Backend API** | Orchestration | A Python FastAPI server that exposes a `/search` endpoint, manages CORS, handles validation, calls the search service, and returns the response. |
| **Web Search Service** | Search Query Formulation | A specialized Python service responsible for compiling search queries from startup parameters and communicating with the search API. |
| **Search Index API** | Web Search Engine | External search engine specialized in returning clean web results, titles, snippets, and answers. |

## Data Schemas

### Request Schema (`POST /search`)
```json
{
  "startup_idea": "AI-based food delivery for college students",
  "industry": "Food Technology",
  "target_market": "College students"
}
```

### Response Schema
```json
{
  "startup_idea": "AI-based food delivery for college students",
  "results": [
    {
      "title": "Example Competitor A",
      "url": "https://competitor-a.com",
      "content": "Description of Competitor A's offering and services...",
      "score": 0.95
    }
  ]
}
```
