import { useEffect, useState } from "react";

function formatTime(ms: number) {
  if (ms <= 0) return "00:00:00:00";
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return `${String(days).padStart(2,"0")}:${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

export default function CountdownTimer({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState<number>(target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setRemaining(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="countdown" aria-live="polite">
      <strong>Countdown</strong>
      <div className="countdown-value">{formatTime(remaining)}</div>
      <div className="countdown-label">days : hrs : min : sec</div>
    </div>
  );
}