export default function ExecutiveSummary({ report }) {
  if (!report) return null;

  return (
    <section className="dashboard-section executive-summary">
      <h2>Executive Summary</h2>
      <p>{report.executive_summary}</p>

      {report.used_sandbox_mode && (
        <div className="notice notice-warning">
          Running in sandbox mode -- results are simulated. Add a Tavily API key
          to the backend to see live research.
        </div>
      )}

      {report.errors && report.errors.length > 0 && (
        <div className="notice notice-error">
          <strong>Some parts of this analysis are incomplete:</strong>
          <ul>
            {report.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
