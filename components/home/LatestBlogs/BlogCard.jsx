import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Reusable blog card — image with a date badge, title, excerpt, "Read More".
 * Presentational; reads one post object.
 */
export default function BlogCard({ blog }) {
  const { title, excerpt, image, date, href } = blog;

  return (
    <article className="blog-card">
      <Link href={href} className="blog-card__image-wrap" aria-label={title}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="blog-card__image" loading="lazy" />
        {date ? (
          <span className="blog-card__date">
            <strong>{date.day}</strong>
            <span>{date.month}</span>
          </span>
        ) : null}
      </Link>

      <div className="blog-card__body">
        <h3 className="blog-card__title">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="blog-card__excerpt">{excerpt}</p>
        <Link href={href} className="blog-card__more">
          Read More
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
