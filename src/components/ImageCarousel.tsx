import { useState } from "react";

export default function ImageCarousel({ images = [], alt = "" }: { images?: string[]; alt?: string }) {
  const [i, setI] = useState(0);
  if (!images || images.length === 0) {
    return <div className="carousel placeholder">No images</div>;
  }
  const prev = () => setI((s) => (s - 1 + images.length) % images.length);
  const next = () => setI((s) => (s + 1) % images.length);

  return (
    <div className="carousel" aria-roledescription="carousel">
      <button
        className="nav left"
        onClick={prev}
        aria-label="Previous image"
        title="Previous"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <img src={images[i]} alt={alt || `Image ${i + 1}`} />

      <button
        className="nav right"
        onClick={next}
        aria-label="Next image"
        title="Next"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>

      <div className="dots">
        {images.map((_, idx) => (
          <button key={idx} className={`dot ${idx === i ? "active" : ""}`} onClick={() => setI(idx)} aria-label={`Go to image ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
}