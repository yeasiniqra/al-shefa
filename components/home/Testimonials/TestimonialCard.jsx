import { Quote } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";

/**
 * Reusable testimonial card — quote mark, text, star rating, name, location.
 * Presentational; reads one testimonial object.
 */
export default function TestimonialCard({ testimonial }) {
  const { quote, name, location, rating } = testimonial;

  return (
    <article className="testimonial-card">
      <Quote className="testimonial-card__quote" size={30} aria-hidden="true" />
      <p className="testimonial-card__text">&ldquo;{quote}&rdquo;</p>
      <RatingStars rating={rating} size={18} />
      <h3 className="testimonial-card__name">{name}</h3>
      {location ? <span className="testimonial-card__location">{location}</span> : null}
    </article>
  );
}
