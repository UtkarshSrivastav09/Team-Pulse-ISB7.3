export default function CompetitorLandscape({ competitorAnalysis }) {
  if (!competitorAnalysis) return null;
  const { competitors, market_gaps, differentiation_opportunities } = competitorAnalysis;

  return (
    <section className="dashboard-section competitor-landscape">
      <h2>Competitor Landscape</h2>

      {competitors?.length > 0 ? (
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Competitor</th>
                <th>Type</th>
                <th>Target customer</th>
                <th>Pricing</th>
                <th>Key features</th>
                <th>Weaknesses</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={i}>
                  <td>
                    <strong>{c.name}</strong>
                    {c.positioning && <div className="cell-sub">{c.positioning}</div>}
                  </td>
                  <td>{c.type}</td>
                  <td>{c.target_customer}</td>
                  <td>{c.pricing}</td>
                  <td>{c.features?.join(", ")}</td>
                  <td>{c.weaknesses?.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">No competitors identified from available research.</p>
      )}

      {market_gaps?.length > 0 && (
        <div className="list-block">
          <h3>Market gaps</h3>
          <ul>{market_gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </div>
      )}

      {differentiation_opportunities?.length > 0 && (
        <div className="list-block">
          <h3>Differentiation opportunities</h3>
          <ul>{differentiation_opportunities.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
      )}
    </section>
  );
}
