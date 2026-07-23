import FeatureCard from "./FeatureCard";
import { FEATURES } from "@/data/features";

/**
 * "Why Choose Us" trust strip — a single card containing a dynamic row of
 * feature cells. No heading in the design, so none is added.
 */
export default function WhyChooseUs({ features = FEATURES }) {
  if (!features?.length) return null;

  return (
    <section className="why-choose" aria-label="Why choose AL-SHEFA">
      <div className="container">
        <div className="why-choose__grid">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
