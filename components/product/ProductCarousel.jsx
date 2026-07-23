"use client";

import Slider from "@/components/ui/Slider";
import ProductCard from "@/components/product/ProductCard";

/**
 * Horizontal product carousel — Splide via the shared <Slider> wrapper. Shows 6
 * cards on desktop and steps down responsively (5 / 4 / 3 / 2). Reusable for any
 * product row (category rows, "related products", "you may also like", etc.).
 */
const PRODUCT_SLIDER_OPTIONS = {
  perPage: 6,
  gap: "16px",
  arrows: true,
  pagination: false,
  drag: true,
  rewind: false,
  speed: 500,
  breakpoints: {
    1199: { perPage: 5 },
    991: { perPage: 4, gap: "14px" },
    767: { perPage: 3, gap: "12px" },
    575: { perPage: 2, gap: "10px" },
  },
};

export default function ProductCarousel({ products = [], ariaLabel }) {
  if (!products.length) return null;

  return (
    <Slider
      className="product-carousel"
      options={PRODUCT_SLIDER_OPTIONS}
      data={products}
      ariaLabel={ariaLabel}
      renderItem={(product) => <ProductCard product={product} />}
    />
  );
}
