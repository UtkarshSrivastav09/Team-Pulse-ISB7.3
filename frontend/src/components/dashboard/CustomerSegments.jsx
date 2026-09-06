export default function CustomerSegments({ marketAnalysis }) {
  if (!marketAnalysis) return null;
  const { customer_segments, pain_points, motivations, buying_behavior } = marketAnalysis;

  return (
    <section className="dashboard-section customer-segments">
      <h2>Customer Segmentation</h2>

      {customer_segments?.length > 0 ? (
        <div className="segment-grid">
          {customer_segments.map((seg, i) => (
            <div className="segment-card" key={i}>
              <h3>{seg.segment}</h3>
              {seg.needs?.length > 0 && (
                <>
                  <span className="segment-label">Needs</span>
                  <ul>{seg.needs.map((n, j) => <li key={j}>{n}</li>)}</ul>
                </>
              )}
              {seg.pain_points?.length > 0 && (
                <>
                  <span className="segment-label">Pain points</span>
                  <ul>{seg.pain_points.map((p, j) => <li key={j}>{p}</li>)}</ul>
                </>
              )}
              {seg.motivations?.length > 0 && (
                <>
                  <span className="segment-label">Motivations</span>
                  <ul>{seg.motivations.map((m, j) => <li key={j}>{m}</li>)}</ul>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">No specific customer segments found in available sources.</p>
      )}

      <div className="two-col">
        {pain_points?.length > 0 && (
          <div className="list-block">
            <h3>Overall pain points</h3>
            <ul>{pain_points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        )}
        {motivations?.length > 0 && (
          <div className="list-block">
            <h3>Motivations</h3>
            <ul>{motivations.map((m, i) => <li key={i}>{m}</li>)}</ul>
          </div>
        )}
      </div>

      {buying_behavior?.length > 0 && (
        <div className="list-block">
          <h3>Buying behaviour</h3>
          <ul>{buying_behavior.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>
      )}
    </section>
  );
}
