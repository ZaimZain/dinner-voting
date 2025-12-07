import type { Restaurant, VoteEntry } from "../types";

export default function VotingResults({
  restaurants,
  votes,
  visible
}: {
  restaurants: Restaurant[];
  votes: VoteEntry[];
  visible: boolean;
}) {
  if (!visible) return null;

  const counts = restaurants.reduce<Record<string, number>>((acc, r) => {
    acc[r.id] = 0;
    return acc;
  }, {});

  votes.forEach(v => {
    counts[v.restaurantId] = (counts[v.restaurantId] || 0) + 1;
  });

  const total = votes.length || 1;

  return (
    <div className="card results-card" aria-live="polite">
      <h2>Collective Results</h2>
      <small>As of now ({votes.length} vote{votes.length !== 1 ? "s" : ""})</small>

      <ul className="results-list">
        {restaurants.map(r => {
          const c = counts[r.id] || 0;
          const pct = Math.round((c / total) * 100);
          return (
            <li key={r.id} className="result-item">
              <div className="row">
                <strong>{r.name}</strong>
                <span className="count">{c}</span>
              </div>
              <div className="bar">
                <div className="fill" style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}