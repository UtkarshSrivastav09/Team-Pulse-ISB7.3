import { useState } from 'react'
import './App.css'

function App() {
  // Input fields state
  const [startupIdea, setStartupIdea] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  
  // App status state
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState(null)
  const [searchResult, setSearchResult] = useState(null)

  // Simulation steps for loading feedback
  const loadingSteps = [
    "Analyzing target industry & indexing keywords...",
    "Formulating search parameters and search strings...",
    "Querying search databases and compiling web data...",
    "Parsing web responses and compiling competitor metrics...",
    "Structuring analysis report and loading layout..."
  ]

  const handleSearch = async (e) => {
    e.preventDefault()
    
    // Reset previous states
    setError(null)
    setSearchResult(null)
    setLoading(true)
    setCurrentStep(0)

    // Basic Validation
    if (!startupIdea.trim() || !industry.trim() || !targetMarket.trim()) {
      setError("Please fill out all the fields.")
      setLoading(false)
      return
    }

    // Step cycle interval for user feedback
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        clearInterval(stepInterval)
        return prev
      })
    }, 1200)

    try {
      // Send request to FastAPI backend (uses environment variable VITE_API_URL if present, otherwise defaults to localhost)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startup_idea: startupIdea,
          industry: industry,
          target_market: targetMarket,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Server returned status ${response.status}`)
      }

      const data = await response.json()
      setSearchResult(data)
    } catch (err) {
      console.error("Search failed:", err)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      setError(err.message || `An unexpected error occurred while communicating with the backend. Make sure your API server is running and accessible at ${apiUrl}.`)
    } finally {
      clearInterval(stepInterval)
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSearchResult(null)
    setError(null)
  }

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Development of AI Based Startup Idea Validator with Market Analysis Assistance</h1>
        <p className="subtitle">
          Submit your concept to compile target market intelligence and map the competitor landscape.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        {/* State 1: Input Form */}
        {!searchResult && !loading && (
          <div className="glass-card form-card animate-fade-in">
            <h2 className="section-title">Startup Idea Parameters</h2>
            <form onSubmit={handleSearch} className="startup-form">
              <div className="form-group">
                <label htmlFor="startupIdea">Startup Idea Description</label>
                <textarea
                  id="startupIdea"
                  placeholder="e.g., An AI-powered route planning app for electric cargo bike deliveries in dense urban areas..."
                  value={startupIdea}
                  onChange={(e) => setStartupIdea(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="industry">Industry / Sector</label>
                  <input
                    id="industry"
                    type="text"
                    placeholder="e.g., Green Logistics / Food Tech"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="targetMarket">Target Market</label>
                  <input
                    id="targetMarket"
                    type="text"
                    placeholder="e.g., Local e-commerce shops, urban couriers"
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <div className="error-banner">{error}</div>}

              <button type="submit" className="btn btn-primary">
                Search Web & Validate
              </button>
            </form>
          </div>
        )}

        {/* State 2: Loading State */}
        {loading && (
          <div className="glass-card loading-card animate-fade-in">
            <div className="spinner"></div>
            <h2 className="loading-title">Analyzing Startup Parameters</h2>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
              ></div>
            </div>
            <div className="loading-steps-container">
              {loadingSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`loading-step ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                >
                  <span className="step-indicator">
                    {idx < currentStep ? '✓' : idx === currentStep ? '●' : '○'}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State 3: Results Display */}
        {searchResult && !loading && (
          <div className="results-container animate-fade-in">
            {/* Top Indicator */}
            <div className="results-meta">
              <div className="meta-badge">
                Data Feed: {searchResult.mode === 'live' ? '⚡ Real-time Search Index' : searchResult.mode === 'mock' ? '📋 Local Simulation Index' : '⚠️ Fallback Report'}
              </div>
              <button onClick={resetForm} className="btn btn-secondary">
                ← Analyze Another Idea
              </button>
            </div>

            {/* Idea Context Panel */}
            <div className="glass-card summary-card">
              <h2 className="section-title">Submitted Details</h2>
              <div className="details-grid">
                <div className="details-item">
                  <strong>Startup Idea:</strong> {searchResult.startup_idea}
                </div>
                <div className="details-item-row">
                  <div><strong>Industry:</strong> {searchResult.industry}</div>
                  <div><strong>Target Market:</strong> {searchResult.target_market}</div>
                </div>
              </div>
            </div>

            {/* AI Synthesized Answer Card */}
            {searchResult.answer && (
              <div className="glass-card answer-card">
                <div className="report-badge">Market Analysis Report</div>
                <h3 className="card-title">Executive Summary</h3>
                <p className="synthesized-answer">{searchResult.answer}</p>
              </div>
            )}

            {/* Web Search Results Section */}
            <div className="web-results-section">
              <h2 className="section-title">Retrieved Web Data & Competitors</h2>
              {searchResult.results && searchResult.results.length > 0 ? (
                <div className="results-grid">
                  {searchResult.results.map((result, index) => (
                    <div key={index} className="glass-card result-item-card">
                      <div className="result-header">
                        <span className="result-number">#{index + 1}</span>
                        {result.score > 0 && (
                          <span className="result-score">Relevance: {Math.round(result.score * 100)}%</span>
                        )}
                      </div>
                      <h4 className="result-title">{result.title}</h4>
                      <p className="result-snippet">{result.content}</p>
                      {result.url && result.url !== '#' && (
                        <a 
                          href={result.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="result-link-btn"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card empty-card">
                  <p>No web results found for this query.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>Team Pulse - Infosys Springboard 7.0 Batch 3</p>
      </footer>
    </div>
  )
}

export default App
