import React, { useState, useEffect } from "react";
import CountdownTimer from "./components/CountdownTimer";
import VotingForm from "./components/VotingForm";
import VotingResults from "./components/VotingResults";
import { Restaurant, VoteEntry } from "./types";
import "./index.css";

const TARGET = new Date("2025-12-25T19:00:00");

const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Olive & Ember",
    description: "Cozy seasonal plates, wood-fired flavors, & warm cocktails.",
    images: [
      "https://images.unsplash.com/photo-1555992336-03a23c2b2f24?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop"
    ]
  },
  {
    id: "r2",
    name: "Harbor Bistro",
    description: "Fresh seafood, waterfront views and elevated classics.",
    images: [
      "https://images.unsplash.com/photo-1543352634-3f6f0b1f8c67?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541542684-3a1f2d2b7f9a?w=1200&q=80&auto=format&fit=crop"
    ]
  },
  {
    id: "r3",
    name: "Garden Table",
    description: "Vegetable-forward tasting menu with creative pairings.",
    images: [
      "https://images.unsplash.com/photo-1523475496153-3d6cc1e3f6b2?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&q=80&auto=format&fit=crop"
    ]
  }
];

const STORAGE_KEY = "dinner-votes-2025-12-25";

export default function App() {
  const [votes, setVotes] = useState<VoteEntry[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setVotes(JSON.parse(raw));
    } catch {
      setVotes([]);
    }
  }, []);

  function onCast(vote: VoteEntry) {
    const next = [...votes, vote];
    setVotes(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setHasVoted(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>Christmas Dinner — Vote a Venue</h1>
        <p className="sub">December 25, 2025 — 7:00 PM</p>
        <CountdownTimer target={TARGET} />
      </header>

      <main className="container">
        <VotingForm restaurants={RESTAURANTS} onVote={onCast} />
      </main>

      <footer className="results-area">
        <VotingResults restaurants={RESTAURANTS} votes={votes} visible={hasVoted} />
      </footer>
    </div>
  );
}