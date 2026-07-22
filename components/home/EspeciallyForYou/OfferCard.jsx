import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

/**
 * One offer box: label / title / subtitle + a colored icon circle + a CTA button.
 * The whole card is the link; the button is a visual span (no nested <a>).
 * The box's `color` drives icon circle, button and glow via one --offer-color var.
 */
function CardBody({ item }) {
  return (
    <>
      <div className="offer-card__top">
        <div className="offer-card__text">
          {item.label ? <span className="offer-card__label">{item.label}</span> : null}
          {item.title ? <span className="offer-card__title">{item.title}</span> : null}
          {item.subtitle ? <span className="offer-card__subtitle">{item.subtitle}</span> : null}
        </div>
        <span className="offer-card__icon">
          <CategoryIcon name={item.icon} size={24} />
        </span>
      </div>

      {item.buttonLabel ? <span className="offer-card__btn">{item.buttonLabel}</span> : null}
    </>
  );
}

export default function OfferCard({ item }) {
  const style = item.color ? { "--offer-color": item.color } : undefined;
  const link = item.link || "";
  const isInternal = link.startsWith("/");
  const isExternal = link.startsWith("http");

  if (!link) {
    return (
      <div className="offer-card" style={style}>
        <CardBody item={item} />
      </div>
    );
  }

  if (isInternal) {
    return (
      <Link href={link} className="offer-card" style={style} aria-label={item.buttonLabel || item.title}>
        <CardBody item={item} />
      </Link>
    );
  }

  return (
    <a
      href={link}
      className="offer-card"
      style={style}
      aria-label={item.buttonLabel || item.title}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <CardBody item={item} />
    </a>
  );
}