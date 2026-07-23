import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ABOUT } from "@/data/about";

/**
 * "About AL-SHEFA" home section — text + trust highlights + CTA on the left,
 * image on the right. All content comes from data/about.js (no hardcoded copy).
 *
 * Per the design instruction, no subtitle / underline / subheading is added —
 * just the heading, body copy, highlights and CTA.
 */
export default function About({ data = ABOUT }) {
  const { heading, brand, paragraphs, highlights, cta, image, imageAlt } = data;

  return (
    <section className="about" aria-label="About AL-SHEFA">
      <div className="container about__inner">
        <div className="about__content">
          <h2 className="about__heading">
            {heading} <span className="about__brand">{brand}</span>
          </h2>

          {paragraphs.map((p, i) => (
            <p className="about__text" key={i}>
              {p}
            </p>
          ))}

          {highlights?.length ? (
            <ul className="about__highlights">
              {highlights.map((h) => (
                <li className="about__highlight" key={h.id}>
                  <span className="about__highlight-icon">
                    <CategoryIcon name={h.icon} size={22} />
                  </span>
                  <span className="about__highlight-title">{h.title}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {cta ? (
            <Link href={cta.href} className="about__cta">
              {cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <div className="about__media">
          {/* Local placeholder now; swap for real photography / API image URL. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} className="about__image" />
        </div>
      </div>
    </section>
  );
}
