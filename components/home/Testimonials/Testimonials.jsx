import SectionTitle from "@/components/ui/SectionTitle";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS } from "@/data/testimonials";

/**
 * "What Our Customers Say" — reuses <SectionTitle>, maps a dynamic list to
 * <TestimonialCard>. No subtitle/decoration added (per the design instruction).
 */
export default function Testimonials({ items = TESTIMONIALS }) {
  if (!items?.length) return null;

  return (
    <section className="testimonials" aria-label="Customer testimonials">
      <div className="container">
        <SectionTitle title="What Our Customers Say" />

        <div className="testimonials__grid">
          {items.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
