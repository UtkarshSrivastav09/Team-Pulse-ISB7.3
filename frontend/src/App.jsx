import { useState } from 'react'
import './App.css'
import StartupAnalysisDashboard from './components/dashboard/StartupAnalysisDashboard'

function App() {
  // Input fields state
  const [startupIdea, setStartupIdea] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  
  // App status state
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState(null)
  const [report, setReport] = useState(null)

  // Simulation steps for loading feedback
  // Milestone 2: updated to reflect the actual pipeline stages (web search ->
  // market analysis -> competitor analysis -> quality check -> report).
  const loadingSteps = [
    "Analyzing target industry & indexing market parameters...",
    "Running targeted web research across market, customer & competitor queries...",
    "Running AI market opportunity & customer segmentation analysis...",
    "Running AI competitor discovery & comparison analysis...",
    "Validating outputs and generating executive report..."
  ]

  // Sample prompt presets for quick testing
  const samplePrompts = [
    {
      label: "⚡ Electric Urban Logistics",
      idea: "An AI-powered route planning app for electric cargo bike deliveries in dense urban areas.",
      industry: "Green Logistics & Mobility",
      market: "Local e-commerce shops, urban couriers"
    },
    {
      label: "🥗 Smart Meal Prep",
      idea: "A personalized AI meal planner that scans household groceries to minimize food waste and optimize nutrition.",
      industry: "FoodTech & Health",
      market: "Busy professionals, fitness enthusiasts"
    },
    {
      label: "🩺 Telehealth for Pets",
      idea: "An on-demand veterinary telehealth platform with instant AI triage and symptom detection from smartphone photos.",
      industry: "Pet Care & HealthTech",
      market: "Pet owners, veterinary clinics"
    }
  ]

  const handleApplyPreset = (preset) => {
    setStartupIdea(preset.idea)
    setIndustry(preset.industry)
    setTargetMarket(preset.market)
    setError(null)
  }

  const handleValidate = async (e) => {
    e.preventDefault()

    // Reset previous states
    setError(null)
    setReport(null)
    setLoading(true)
    setCurrentStep(0)

    // Basic Validation
    if (!startupIdea.trim() || !industry.trim() || !targetMarket.trim()) {
      setError("Please fill out all required fields.")
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
      // Milestone 2: calls /validate (full LangGraph pipeline) instead of /search.
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/validate`, {
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
      setReport(data)
    } catch (err) {
      console.error("Validation failed:", err)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      setError(err.message || `An unexpected error occurred while communicating with the backend. Make sure your API server is running and accessible at ${apiUrl}.`)
    } finally {
      clearInterval(stepInterval)
      setLoading(false)
    }
  }

  const resetForm = () => {
    setReport(null)
    setError(null)
  }

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="brand-badge">
          <span className="live-indicator-dot"></span>
          <span>Infosys Springboard 7.0 • Team Pulse</span>
        </div>
        <h1>AI-Based Startup Idea Validator & Market Intelligence</h1>
        <p className="subtitle">
          Submit your concept to evaluate market feasibility, map competitors in real-time, and extract actionable executive intelligence.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        {/* State 1: Input Form */}
        {!report && !loading && (
          <div className="glass-card form-card animate-fade-in">
            <h2 className="section-title">
              <span>🚀</span> Startup Concept Parameters
            </h2>

            {/* Quick Demo Idea Prompts */}
            <div className="demo-prompts-bar">
              <span className="demo-prompts-label">Try an example:</span>
              {samplePrompts.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="demo-chip"
                  onClick={() => handleApplyPreset(preset)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleValidate} className="startup-form">
              <div className="form-group">
                <label htmlFor="startupIdea">
                  <span>💡</span> Startup Idea & Description
                </label>
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
                  <label htmlFor="industry">
                    <span>🏢</span> Industry / Domain
                  </label>
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
                  <label htmlFor="targetMarket">
                    <span>🎯</span> Target Audience & Market
                  </label>
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

              {error && (
                <div className="error-banner">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary">
                <span>⚡</span> Run Market Analysis & Validate
              </button>
            </form>
          </div>
        )}

        {/* State 2: Loading State */}
        {loading && (
          <div className="glass-card loading-card animate-fade-in">
            <div className="spinner-wrapper">
              <div className="spinner"></div>
            </div>
            <h2 className="loading-title">Synthesizing Market Intelligence</h2>
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

        {/* State 3: Results Display -- Milestone 2 structured dashboard */}
        {report && !loading && (
          <div className="results-container animate-fade-in">
            {/* Top Indicator */}
            <div className="results-meta">
              <div className="meta-badge">
                <span className="live-indicator-dot"></span>
                Feed: {report.used_sandbox_mode ? '📋 Local Simulation Index' : '⚡ Real-time Search Index'}
              </div>
              <button onClick={resetForm} className="btn btn-secondary">
                ← Validate Another Idea
              </button>
            </div>

            {/* Idea Context Panel */}
            <div className="glass-card summary-card">
              <h2 className="section-title">
                <span>📋</span> Analyzed Concept
              </h2>
              <div className="details-grid">
                <div className="details-item">
                  <strong>Startup Idea:</strong> {report.startup_idea}
                </div>
                <div className="details-item-row">
                  <div><strong>Industry:</strong> {report.industry}</div>
                  <div><strong>Target Market:</strong> {report.target_market}</div>
                </div>
              </div>
            </div>

            {/* Milestone 2: full structured analysis -- executive summary,
                market opportunity, customer segments, competitor landscape,
                and sources, in place of the Milestone 1 raw result grid. */}
            <StartupAnalysisDashboard report={report} />
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>Team Pulse — Infosys Springboard 7.0 Batch 3</p>
      </footer>
    </div>
  )
}

export default App
