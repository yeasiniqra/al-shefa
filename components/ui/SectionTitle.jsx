import { Leaf } from "lucide-react";

/**
 * Reusable section heading — a centered title flanked by leaf marks and short
 * rules (matches the AL-SHEFA leaf motif). Use it above any home/section block:
 *
 *   <SectionTitle title="Especially For You" />
 *   <SectionTitle>Featured Products</SectionTitle>
 */
export default function SectionTitle({ title, children, className = "" }) {
  const text = title ?? children;

  return (
    <div className={`section-title${className ? ` ${className}` : ""}`}>
      <span className="section-title__line" aria-hidden="true" />
      <Leaf className="section-title__leaf" size={18} aria-hidden="true" />
      <h2 className="section-title__text">{text}</h2>
      <Leaf className="section-title__leaf" size={18} aria-hidden="true" />
      <span className="section-title__line" aria-hidden="true" />
    </div>
  );
}