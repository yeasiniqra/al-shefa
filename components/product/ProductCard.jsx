"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";


/**
 * Reusable product card (matches the reference: image, name + subtitle,
 * price / struck MRP / discount badge, Add to Cart). Used by the home
 * category carousels now, and by listing/search/related grids later.
 *
 * Data-driven and API-ready — it reads the normalized product shape from
 * data/categoryProducts.js. Adding to cart goes through the cart store, so the
 * header count updates and the same path works once the cart API is wired.
 */
export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  let fallbackImage = "/images/not-found.png";
  const {
    id,
    name,
    subtitle,
    slug,
    image,
    price,
    mrp,
    discount = 0,
    currency,
    inStock = true,
  } = product;

  const href = `/product/${slug || id}`;
  const showMrp = mrp && mrp > price;

  const imageURL = image ? image : fallbackImage;

  const handleAdd = () => {
    if (!inStock) return;
    addItem({ id, productId: id, name, image, price, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className={`product-card${inStock ? "" : " is-out"}`}>
      <Link href={href} className="product-card__image-wrap" aria-label={name}>
        {/* Local placeholder now; swap for real product photos / API image URLs. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src={image}
          alt={name}
          className="product-card__image"
          loading="lazy"
          decoding="async"
        /> */}
        <img
  src={imageURL}
  alt={name}
  className="product-card__image"
  loading="lazy"
  decoding="async"
  onError={(e) => {
    e.currentTarget.src = fallbackImage;
  }}
/>
      </Link>

      <div className="product-card__body">
        <Link href={href} className="product-card__title-link">
          <h3 className="product-card__name">{name}</h3>
          {subtitle ? <p className="product-card__subtitle">{subtitle}</p> : null}
        </Link>

        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(price, currency)}</span>
          {showMrp ? (
            <span className="product-card__mrp">{formatPrice(mrp, currency)}</span>
          ) : null}
          {discount > 0 ? (
            <span className="product-card__discount">{discount}% OFF</span>
          ) : null}
        </div>

        <button
          type="button"
          className={`product-card__btn${added ? " is-added" : ""}`}
          onClick={handleAdd}
          disabled={!inStock}
          aria-label={inStock ? `Add ${name} to cart` : `${name} is out of stock`}
        >
          {!inStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
