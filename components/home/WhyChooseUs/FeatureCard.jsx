import { CategoryIcon } from "@/components/ui/CategoryIcon";

/**
 * Reusable feature cell — icon, title, supporting text. Presentational.
 */
export default function FeatureCard({ feature }) {
  const { icon, title, text } = feature;

  return (
    <div className="feature-card">
      <span className="feature-card__icon">
        <CategoryIcon name={icon} size={26} />
      </span>
      <h3 className="feature-card__title">{title}</h3>
      {text ? <p className="feature-card__text">{text}</p> : null}
    </div>
  );
}
