import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Import the SearchService
from services.search_service import SearchService

# Milestone 2: the LangGraph pipeline (web search -> market analysis ->
# competitor analysis -> quality check -> final report)
from graph.startup_validation_graph import run_validation

# Load environment variables
load_dotenv(override=True)

app = FastAPI(
    title="Startup Idea Validator API",
    description="Backend API supporting the AI-Based Startup Idea Validator with Market Analysis Assistance.",
    version="2.0.0"
)

# Enable CORS (Cross-Origin Resource Sharing)
# This allows the React frontend to communicate with this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development; adjust for production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Initialize the SearchService
search_service = SearchService()

# Define Pydantic request model for input validation
class SearchRequest(BaseModel):
    startup_idea: str = Field(..., min_length=3, description="Core startup idea or description")
    industry: str = Field(..., min_length=2, description="The market industry or domain")
    target_market: str = Field(..., min_length=2, description="The target audience or customer base")


# Milestone 2: request model for the full validation pipeline.
class ValidateRequest(BaseModel):
    startup_idea: str = Field(..., min_length=3, description="Core startup idea or description")
    industry: str = Field("", description="The market industry or domain")
    target_market: str = Field("", description="The target audience or customer base")


@app.get("/")
def home():
    return {
        "message": "Startup Idea Validator API is running",
        "search_index_connected": search_service._get_tavily_client()[1]
    }

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/search")
def search_startup(request: SearchRequest):
    """
    Search the web for competitor information, market trends, and industry solutions 
    based on the provided startup idea details.
    """
    # Simple validation for empty fields
    if not request.startup_idea.strip() or not request.industry.strip() or not request.target_market.strip():
        raise HTTPException(status_code=400, detail="Startup idea, industry, and target market cannot be empty or whitespace.")

    try:
        print(f"main.py: Received request for startup idea '{request.startup_idea}'")
        search_data = search_service.get_market_data(
            startup_idea=request.startup_idea,
            industry=request.industry,
            target_market=request.target_market
        )
        
        # Return response matching the required structure
        return {
            "startup_idea": request.startup_idea,
            "industry": request.industry,
            "target_market": request.target_market,
            "query": search_data.get("query"),
            "answer": search_data.get("answer"),
            "results": search_data.get("results", []),
            "mode": search_data.get("mode")
        }
    except Exception as e:
        print(f"main.py: Error during search execution: {e}")
        raise HTTPException(status_code=500, detail=f"Web search execution failed: {str(e)}")


@app.post("/validate")
def validate_startup(request: ValidateRequest):
    """
    Milestone 2: run the full startup validation pipeline.

    Web Search Agent -> Market Analysis Agent -> Competitor Analysis Agent
    -> Python quality check -> structured final report.

    Runs targeted multi-category Tavily research (via SearchService.run_targeted_research)
    then exactly two Claude calls (market + competitor analysis). The final
    report is assembled in plain Python -- no third LLM call.
    """
    if not request.startup_idea.strip():
        raise HTTPException(status_code=400, detail="Startup idea cannot be empty or whitespace.")

    try:
        print(f"main.py: Received /validate request for startup idea '{request.startup_idea}'")
        report = run_validation(
            startup_idea=request.startup_idea,
            target_market=request.target_market,
            industry=request.industry,
        )
        return report
    except Exception as e:
        print(f"main.py: Error during validation pipeline execution: {e}")
        raise HTTPException(status_code=500, detail=f"Validation pipeline failed: {str(e)}")