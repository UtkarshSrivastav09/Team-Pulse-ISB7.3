export default function MarketOpportunity({ marketAnalysis }) {
  if (!marketAnalysis) return null;
  const { market_summary, market_size, growth, demand_signals, industry_trends } = marketAnalysis;

  return (
    <section className="dashboard-section market-opportunity">
      <h2>Market Opportunity</h2>
      <p>{market_summary}</p>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Market size</span>
          <span className="stat-value">{market_size?.value}</span>
          {market_size?.url && (
            <a href={market_size.url} target="_blank" rel="noreferrer" className="stat-source">
              {market_size.source || "Source"}
            </a>
          )}
        </div>
        <div className="stat-card">
          <span className="stat-label">Growth (CAGR)</span>
          <span className="stat-value">{growth?.cagr}</span>
          {growth?.period && <span className="stat-sub">{growth.period}</span>}
        </div>
        <div className="stat-card">
          <span className="stat-label">Trend</span>
          <span className="stat-value">{growth?.trend || "Not found in available sources."}</span>
        </div>
      </div>

      {demand_signals?.length > 0 && (
        <div className="list-block">
          <h3>Demand signals</h3>
          <ul>
            {demand_signals.map((signal, i) => (
              <li key={i}>{signal}</li>
            ))}
          </ul>
        </div>
      )}

      {industry_trends?.length > 0 && (
        <div className="list-block">
          <h3>Industry trends</h3>
          <ul>
            {industry_trends.map((trend, i) => (
              <li key={i}>{trend}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
