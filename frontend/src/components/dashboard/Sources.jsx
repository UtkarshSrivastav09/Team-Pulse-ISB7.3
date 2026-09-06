export default function Sources({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="dashboard-section sources">
      <h2>Sources</h2>
      <ul className="source-list">
        {sources.map((s, i) => (
          <li key={i}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.title || s.url}
            </a>
            {s.source && <span className="source-domain"> -- {s.source}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
