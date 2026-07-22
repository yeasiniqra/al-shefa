import Link from "next/link";
import { imageURL, IMAGE_OF, IMAGE_SIZE } from "@/lib/image";

/**
 * One banner slide — the Al-Shefa equivalent of Lazz Pharma's
 * `BannerTemplate.jsx`. Renders the image (eager + high priority for the first
 * slide, so the hero paints fast) wrapped in the right kind of link:
 *   - internal route  -> next/link <Link>
 *   - "tel:" number   -> plain <a>
 *   - no link         -> bare image
 */
function BannerImg({ src, alt, priority }) {
  return (
    <span className="banner__img-wrap">
      <img
        src={src}
        alt={alt || ""}
        className="banner__img"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </span>
  );
}

export default function BannerSlide({ item, priority = false }) {
  const src = imageURL(item.image, IMAGE_OF.BANNER, IMAGE_SIZE.ORIGINAL);
  const isPhoneNumber = item.link?.startsWith("tel");

  if (!item.link) {
    return <BannerImg src={src} alt={item.alt} priority={priority} />;
  }

  if (isPhoneNumber) {
    return (
      <a href={item.link}>
        <BannerImg src={src} alt={item.alt} priority={priority} />
      </a>
    );
  }

  return (
    <Link href={item.link} aria-label={item.alt || undefined}>
      <BannerImg src={src} alt={item.alt} priority={priority} />
    </Link>
  );
}
