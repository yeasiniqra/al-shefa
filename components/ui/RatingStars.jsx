import { Star } from "lucide-react";

/**
 * Reusable star rating (read-only). Data-driven — pass a numeric `rating`.
 * Used by testimonials now; reused by product cards / reviews later.
 */
export default function RatingStars({ rating = 0, max = 5, size = 16 }) {
  const filled = Math.round(rating);

  return (
    <div
      className="rating-stars"
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`rating-stars__star${i < filled ? " is-filled" : ""}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
