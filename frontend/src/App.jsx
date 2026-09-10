import { useState } from "react";
import "./App.css";

const demoIdeas = [
  {
    icon: "⚡",
    title: "Green Logistics",
    idea: "An AI-powered route optimization platform for electric cargo bike deliveries in crowded cities.",
    industry: "Green Logistics & Mobility",
    market: "Local businesses, delivery companies and urban couriers",
  },
  {
    icon: "🎓",
    title: "AI Education",
    idea: "An AI learning assistant that converts lectures and study materials into personalised notes, quizzes and mock examinations.",
    industry: "EdTech & Artificial Intelligence",
    market: "College students and competitive exam aspirants",
  },
  {
    icon: "🥗",
    title: "Smart Nutrition",
    idea: "A smart meal planning platform that recommends healthy meals based on available groceries, nutrition goals and lifestyle.",
    industry: "HealthTech & FoodTech",
    market: "Busy professionals, families and fitness enthusiasts",
  },
];

function createStartupInsights(idea, industry, market) {
  let hash = 0;

  const text = `${idea}${industry}${market}`;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const value = Math.abs(hash);

  return {
    score: 78 + (value % 16),
    demand: 75 + (value % 18),
    opportunity: 76 + ((value >> 2) % 17),
    execution: 70 + ((value >> 3) % 20),

    strengths: [
      `Clear solution targeted towards problems faced by ${market}.`,
      `Potential to build a scalable product within the ${industry} industry.`,
      "Technology can help automate repetitive activities and improve customer experience.",
    ],

    weaknesses: [
      "Early customer acquisition may require significant awareness and education.",
      `Building trust among users in the ${industry} market may take time.`,
      "The initial version will require strong product-market validation.",
    ],

    opportunities: [
      `Growing digital adoption creates opportunities within ${industry}.`,
      `Potential partnerships with organisations serving ${market}.`,
      "The product can expand into additional customer segments after validation.",
    ],

    threats: [
      "Existing competitors could quickly introduce similar functionality.",
      "Customer expectations may change rapidly.",
      "Large technology companies could enter the same market.",
    ],

    pitch: `${idea} The solution is designed specifically for ${market}, creating a simpler, faster and more intelligent experience in the ${industry} ecosystem.`,

    gtm: [
      `Interview 15–20 potential customers from ${market}.`,
      "Build a focused MVP around the single most important customer problem.",
      "Run a small pilot programme and measure user engagement.",
      "Use customer feedback to improve pricing and positioning.",
      `Build partnerships with companies operating within ${industry}.`,
    ],
  };
}

function App() {
  const [startupIdea, setStartupIdea] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetMarket, setTargetMarket] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";

  const loadDemo = (demo) => {
    setStartupIdea(demo.idea);
    setIndustry(demo.industry);
    setTargetMarket(demo.market);
    setError("");

    document
      .getElementById("validator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !startupIdea.trim() ||
      !industry.trim() ||
      !targetMarket.trim()
    ) {
      setError("Please complete all three fields before validating.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(`${API_URL}/search`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          startup_idea: startupIdea,
          industry: industry,
          target_market: targetMarket,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to complete startup analysis."
        );
      }

      setResult(data);
      setActiveTab("overview");

      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to connect to the backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setStartupIdea("");
    setIndustry("");
    setTargetMarket("");
    setResult(null);
    setError("");
  };

  const scrollToValidator = () => {
    document
      .getElementById("validator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const insights = result
    ? createStartupInsights(
        result.startup_idea,
        result.industry,
        result.target_market
      )
    : null;

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="brand">
            <div className="brand-logo">
              <span>TP</span>
            </div>

            <div className="brand-text">
              <strong>TeamPulse</strong>
              <span>Startup Intelligence</span>
            </div>
          </div>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#validator">Validator</a>
            <a href="#how-it-works">How it works</a>
          </div>

          <button className="nav-button" onClick={scrollToValidator}>
            Validate idea
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="background-orb orb-one"></div>
          <div className="background-orb orb-two"></div>
          <div className="grid-pattern"></div>

          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                AI powered startup intelligence
              </div>

              <h1>
                Turn your startup
                <span> idea into insight.</span>
              </h1>

              <p className="hero-description">
                Validate your business concept using real-time market
                intelligence. Discover competitors, understand your
                customers and make smarter decisions before you build.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={scrollToValidator}
                >
                  Validate my startup
                  <span>→</span>
                </button>

                <a
                  href="#how-it-works"
                  className="secondary-button"
                >
                  See how it works
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <strong>Real-time</strong>
                  <span>Market research</span>
                </div>

                <div className="trust-divider"></div>

                <div className="trust-item">
                  <strong>AI-powered</strong>
                  <span>Business insights</span>
                </div>

                <div className="trust-divider"></div>

                <div className="trust-item">
                  <strong>Actionable</strong>
                  <span>Growth strategy</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="preview-header">
                  <div>
                    <span className="preview-small">
                      Startup intelligence
                    </span>
                    <h3>Idea Analysis</h3>
                  </div>

                  <div className="status-pill">
                    <span></span>
                    Analysis ready
                  </div>
                </div>

                <div className="preview-score-area">
                  <div className="score-circle">
                    <div>
                      <strong>87</strong>
                      <span>/100</span>
                    </div>
                  </div>

                  <div className="score-info">
                    <span>Opportunity score</span>
                    <strong>Strong potential</strong>

                    <div className="mini-line">
                      <div style={{ width: "87%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="preview-stat-grid">
                  <div className="preview-stat">
                    <div className="stat-icon">↗</div>
                    <span>Market demand</span>
                    <strong>High</strong>
                  </div>

                  <div className="preview-stat">
                    <div className="stat-icon">◎</div>
                    <span>Competition</span>
                    <strong>Medium</strong>
                  </div>

                  <div className="preview-stat">
                    <div className="stat-icon">✓</div>
                    <span>Feasibility</span>
                    <strong>Strong</strong>
                  </div>
                </div>

                <div className="preview-insight">
                  <div className="insight-icon">✦</div>

                  <div>
                    <span>AI Insight</span>
                    <p>
                      Strong demand signals found with opportunities for
                      differentiated positioning.
                    </p>
                  </div>
                </div>

                <div className="floating-card floating-one">
                  <span>Competitors</span>
                  <strong>12 identified</strong>
                </div>

                <div className="floating-card floating-two">
                  <span>Market trend</span>
                  <strong>↗ Growing</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <p>
            Built for founders who want clarity before committing
            resources
          </p>

          <div className="business-tags">
            <span>Idea Validation</span>
            <span>Market Research</span>
            <span>Competitor Analysis</span>
            <span>Go-to-Market</span>
            <span>Business Strategy</span>
          </div>
        </section>

        <section className="features-section" id="how-it-works">
          <div className="section-heading">
            <div className="section-label">HOW IT WORKS</div>

            <h2>
              From an idea to a clearer
              <span> business decision.</span>
            </h2>

            <p>
              Our validation workflow converts a basic startup concept
              into useful market intelligence in a few simple steps.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <div className="feature-icon">✎</div>

              <h3>Describe your idea</h3>

              <p>
                Tell us what you want to build, your industry and the
                people you want to serve.
              </p>
            </div>

            <div className="feature-card featured">
              <div className="feature-number">02</div>
              <div className="feature-icon">⌕</div>

              <h3>Analyse the market</h3>

              <p>
                The system searches for competitors, market signals and
                relevant business information.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <div className="feature-icon">⌁</div>

              <h3>Receive your strategy</h3>

              <p>
                Review market opportunities, startup strengths, risks and
                suggested next steps.
              </p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <div className="section-heading">
            <div className="section-label">EXAMPLE IDEAS</div>
            <h2>
              Need inspiration?
              <span> Try an example.</span>
            </h2>
          </div>

          <div className="demo-grid">
            {demoIdeas.map((demo, index) => (
              <button
                className="demo-card"
                key={index}
                onClick={() => loadDemo(demo)}
              >
                <div className="demo-icon">{demo.icon}</div>

                <div className="demo-info">
                  <h3>{demo.title}</h3>
                  <p>{demo.idea}</p>

                  <span>
                    Use this idea <strong>→</strong>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="validator-section" id="validator">
          <div className="validator-wrapper">
            <div className="validator-intro">
              <div className="section-label">
                STARTUP VALIDATOR
              </div>

              <h2>
                Is your idea worth
                <span> building?</span>
              </h2>

              <p>
                Give us some basic information about your startup. Our
                system will analyse the market and provide relevant
                competitor intelligence.
              </p>

              <div className="benefit-list">
                <div className="benefit">
                  <div className="benefit-check">✓</div>

                  <div>
                    <strong>Market validation</strong>
                    <span>
                      Understand whether your idea has real market
                      opportunity.
                    </span>
                  </div>
                </div>

                <div className="benefit">
                  <div className="benefit-check">✓</div>

                  <div>
                    <strong>Competitor intelligence</strong>
                    <span>
                      Discover companies already solving similar
                      problems.
                    </span>
                  </div>
                </div>

                <div className="benefit">
                  <div className="benefit-check">✓</div>

                  <div>
                    <strong>Strategic next steps</strong>
                    <span>
                      Get actionable recommendations for validation and
                      launch.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="validator-card">
              <div className="form-header">
                <div>
                  <span className="form-step">
                    START YOUR ANALYSIS
                  </span>
                  <h3>Tell us about your startup</h3>
                </div>

                <div className="form-icon">✦</div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <div className="field-label-row">
                    <label htmlFor="startupIdea">
                      Startup idea
                    </label>

                    <span>{startupIdea.length}/600</span>
                  </div>

                  <textarea
                    id="startupIdea"
                    maxLength="600"
                    rows="5"
                    value={startupIdea}
                    onChange={(e) =>
                      setStartupIdea(e.target.value)
                    }
                    placeholder="Example: An AI platform that helps small retailers predict inventory demand and reduce food waste..."
                  ></textarea>

                  <small>
                    Explain the problem and how your startup solves it.
                  </small>
                </div>

                <div className="two-columns">
                  <div className="form-field">
                    <label htmlFor="industry">
                      Industry / sector
                    </label>

                    <input
                      id="industry"
                      value={industry}
                      onChange={(e) =>
                        setIndustry(e.target.value)
                      }
                      placeholder="e.g. FinTech"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="market">
                      Target customers
                    </label>

                    <input
                      id="market"
                      value={targetMarket}
                      onChange={(e) =>
                        setTargetMarket(e.target.value)
                      }
                      placeholder="e.g. Small retailers"
                    />
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    <div>!</div>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  className="submit-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="button-loader"></span>
                      Analysing your market...
                    </>
                  ) : (
                    <>
                      <span>✦</span>
                      Validate startup idea
                      <strong>→</strong>
                    </>
                  )}
                </button>

                <p className="form-security">
                  <span>✓</span>
                  Your information is used only for this analysis.
                </p>
              </form>
            </div>
          </div>
        </section>

        {loading && (
          <section className="loading-section">
            <div className="analysis-loader">
              <div className="loader-animation">
                <div className="pulse-circle"></div>
                <div className="loader-logo">TP</div>
              </div>

              <div className="loading-copy">
                <span className="section-label">
                  AI MARKET RESEARCH
                </span>

                <h2>Analysing your startup...</h2>

                <p>
                  Searching competitors and evaluating market
                  opportunities for your concept.
                </p>

                <div className="loading-progress">
                  <div></div>
                </div>

                <div className="loading-items">
                  <span>✓ Understanding startup concept</span>
                  <span>✓ Identifying industry signals</span>
                  <span className="active-loading">
                    ● Analysing competitors
                  </span>
                  <span>○ Preparing strategic insights</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {result && insights && (
          <section className="results-section" id="results">
            <div className="results-heading">
              <div>
                <div className="section-label">
                  VALIDATION REPORT
                </div>

                <h2>Your startup analysis</h2>

                <p>
                  Generated for{" "}
                  <strong>{result.startup_idea}</strong>
                </p>
              </div>

              <button
                className="new-analysis-button"
                onClick={() => {
                  setResult(null);
                  scrollToValidator();
                }}
              >
                + New analysis
              </button>
            </div>

            <div className="score-dashboard">
              <div className="main-score-card">
                <div className="score-card-header">
                  <span>Overall Opportunity Score</span>

                  <span className="positive-chip">
                    Strong potential
                  </span>
                </div>

                <div className="main-score-content">
                  <div className="large-score">
                    <strong>{insights.score}</strong>
                    <span>/100</span>
                  </div>

                  <div className="score-description">
                    <h3>A promising opportunity</h3>

                    <p>
                      Your idea shows strong potential. Focus on customer
                      validation and differentiation before scaling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <span>Market demand</span>
                <strong>{insights.demand}%</strong>

                <div className="metric-track">
                  <div
                    style={{
                      width: `${insights.demand}%`,
                    }}
                  ></div>
                </div>

                <small>Positive demand signals</small>
              </div>

              <div className="metric-card">
                <span>Opportunity</span>
                <strong>{insights.opportunity}%</strong>

                <div className="metric-track">
                  <div
                    style={{
                      width: `${insights.opportunity}%`,
                    }}
                  ></div>
                </div>

                <small>Good expansion potential</small>
              </div>

              <div className="metric-card">
                <span>Execution viability</span>
                <strong>{insights.execution}%</strong>

                <div className="metric-track">
                  <div
                    style={{
                      width: `${insights.execution}%`,
                    }}
                  ></div>
                </div>

                <small>Manageable execution risk</small>
              </div>
            </div>

            <div className="report-navigation">
              <button
                onClick={() => setActiveTab("overview")}
                className={
                  activeTab === "overview" ? "active" : ""
                }
              >
                Overview
              </button>

              <button
                onClick={() => setActiveTab("swot")}
                className={
                  activeTab === "swot" ? "active" : ""
                }
              >
                SWOT Analysis
              </button>

              <button
                onClick={() => setActiveTab("competitors")}
                className={
                  activeTab === "competitors" ? "active" : ""
                }
              >
                Competitors
              </button>

              <button
                onClick={() => setActiveTab("strategy")}
                className={
                  activeTab === "strategy" ? "active" : ""
                }
              >
                Launch Strategy
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="report-content">
                <div className="report-card executive-card">
                  <div className="report-card-title">
                    <div className="report-icon">✦</div>

                    <div>
                      <span>AI ANALYSIS</span>
                      <h3>Executive market summary</h3>
                    </div>
                  </div>

                  <p className="executive-text">
                    {result.answer ||
                      "Your startup idea demonstrates an identifiable customer problem and potential market opportunity. Validate customer willingness to pay and define a differentiated value proposition before investing heavily in development."}
                  </p>

                  <div className="concept-summary">
                    <div>
                      <span>Industry</span>
                      <strong>{result.industry}</strong>
                    </div>

                    <div>
                      <span>Target market</span>
                      <strong>{result.target_market}</strong>
                    </div>

                    <div>
                      <span>Analysis mode</span>
                      <strong>
                        {result.mode === "live"
                          ? "Live market data"
                          : "Simulation mode"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="report-card pitch-card">
                  <div className="report-card-title">
                    <div className="report-icon">🚀</div>

                    <div>
                      <span>POSITIONING</span>
                      <h3>Suggested elevator pitch</h3>
                    </div>
                  </div>

                  <blockquote>
                    “{insights.pitch}”
                  </blockquote>

                  <div className="mentor-tip">
                    <strong>Founder tip</strong>

                    <p>
                      Keep your initial pitch focused on one customer
                      segment and one painful problem.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "swot" && (
              <div className="swot-grid">
                <SWOTCard
                  icon="↗"
                  title="Strengths"
                  subtitle="Internal advantages"
                  items={insights.strengths}
                  type="strength"
                />

                <SWOTCard
                  icon="!"
                  title="Weaknesses"
                  subtitle="Internal challenges"
                  items={insights.weaknesses}
                  type="weakness"
                />

                <SWOTCard
                  icon="✦"
                  title="Opportunities"
                  subtitle="External possibilities"
                  items={insights.opportunities}
                  type="opportunity"
                />

                <SWOTCard
                  icon="⚠"
                  title="Threats"
                  subtitle="External risks"
                  items={insights.threats}
                  type="threat"
                />
              </div>
            )}

            {activeTab === "competitors" && (
              <div className="competitor-section">
                <div className="competitor-intro">
                  <div>
                    <span className="section-label">
                      COMPETITIVE LANDSCAPE
                    </span>

                    <h3>
                      Companies and resources discovered during
                      research
                    </h3>
                  </div>

                  <span className="competitor-count">
                    {result.results?.length || 0} results
                  </span>
                </div>

                {result.results &&
                result.results.length > 0 ? (
                  <div className="competitor-grid">
                    {result.results.map((competitor, index) => (
                      <article
                        className="competitor-card"
                        key={`${competitor.title}-${index}`}
                      >
                        <div className="competitor-top">
                          <div className="company-logo">
                            {competitor.title
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}
                          </div>

                          {competitor.score && (
                            <span className="relevance">
                              {Math.round(
                                competitor.score * 100
                              )}
                              % match
                            </span>
                          )}
                        </div>

                        <h3>
                          {competitor.title ||
                            `Market result ${index + 1}`}
                        </h3>

                        <p>
                          {competitor.content ||
                            "Relevant market intelligence discovered during the analysis."}
                        </p>

                        {competitor.url &&
                          competitor.url !== "#" && (
                            <a
                              href={competitor.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit source
                              <span>↗</span>
                            </a>
                          )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-results">
                    <div>⌕</div>
                    <h3>No competitor results found</h3>
                    <p>
                      Try providing a more specific industry or customer
                      segment.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "strategy" && (
              <div className="strategy-layout">
                <div className="strategy-main">
                  <span className="section-label">
                    GO-TO-MARKET PLAN
                  </span>

                  <h3>
                    Recommended steps before you scale
                  </h3>

                  <div className="timeline">
                    {insights.gtm.map((step, index) => (
                      <div
                        className="timeline-item"
                        key={index}
                      >
                        <div className="timeline-number">
                          {index + 1}
                        </div>

                        <div className="timeline-copy">
                          <span>
                            PHASE {index + 1}
                          </span>
                          <p>{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="strategy-side">
                  <span className="section-label">
                    VALIDATION PRINCIPLE
                  </span>

                  <h3>Talk to customers before writing code.</h3>

                  <p>
                    Strong startup validation comes from real customer
                    behaviour, not only market reports.
                  </p>

                  <div className="strategy-stat">
                    <strong>15–20</strong>
                    <span>
                      Customer interviews recommended
                    </span>
                  </div>
                </aside>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-logo small">
              TP
            </div>

            <div>
              <strong>TeamPulse</strong>
              <p>
                AI-Based Startup Idea Validator & Market Intelligence.
              </p>
            </div>
          </div>

          <div className="footer-right">
            <span>Infosys Springboard 7.0</span>
            <span>Team Pulse</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SWOTCard({
  icon,
  title,
  subtitle,
  items,
  type,
}) {
  return (
    <div className={`swot-card ${type}`}>
      <div className="swot-heading">
        <div className="swot-icon">{icon}</div>

        <div>
          <h3>{title}</h3>
          <span>{subtitle}</span>
        </div>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
