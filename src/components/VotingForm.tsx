import React, { useMemo, useState } from "react";
import { Restaurant, VoteEntry } from "../types";
import ImageCarousel from "./ImageCarousel";

export default function VotingForm({
  restaurants,
  onVote
}: {
  restaurants: Restaurant[];
  onVote: (v: VoteEntry) => void;
}) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string | null>(restaurants[0]?.id ?? null);
  const selectedRest = useMemo(() => restaurants.find(r => r.id === selected) ?? restaurants[0], [restaurants, selected]);

  const disabled = !name.trim() || !selected;

  function cast() {
    if (disabled || !selected) return;
    onVote({ name: name.trim(), restaurantId: selected, time: new Date().toISOString() });
    setName("");
    setSelected(null);
  }

  return (
    <section className="card form-card" aria-labelledby="vote-heading">
      <div className="left">
        <h2 id="vote-heading">Cast your vote</h2>
        <p className="hint">Only one click to cast — results appear below after voting.</p>

        <label className="field">
          <span>Your name</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex" />
        </label>

        <div className="field restaurants">
          <span>Choose a restaurant</span>
          <div className="options">
            {restaurants.map(r => (
              <label key={r.id} className={`option ${selected === r.id ? "selected" : ""}`}>
                <input type="radio" name="restaurant" checked={selected === r.id} onChange={() => setSelected(r.id)} />
                <div className="meta">
                  <strong>{r.name}</strong>
                  <small>{r.description}</small>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button className="primary" onClick={cast} disabled={disabled} aria-disabled={disabled}>
          Cast Vote
        </button>
      </div>

      <aside className="right">
        <ImageCarousel images={selectedRest?.images} alt={selectedRest?.name} />
        <div className="right-meta">
          <h3>{selectedRest?.name}</h3>
          <p>{selectedRest?.description}</p>
        </div>
      </aside>
    </section>
  );
}