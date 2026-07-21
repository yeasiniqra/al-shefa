"use client";

import Link from "next/link";
import { User, Heart, ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";

export default function HeaderActions() {
  // Selectors read live counts — once auth/wishlist/cart are wired to the API,
  // these numbers update automatically with zero changes here.
  const user = useAuthStore((s) => s.user);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.qty, 0)
  );
  // Reference design shows no badge on Wishlist — keep the store wired in so
  // a badge (like Cart's) can be added later with one line: `useWishlistStore((s) => s.items.length)`

  return (
    <div className="header-actions">
      <Link href={user ? "/account/profile" : "/login"} className="header-actions__item">
        <User size={22} />
        <span>{user ? user.name : "Login / Register"}</span>
      </Link>

      <Link href="/wishlist" className="header-actions__item">
        <span className="header-actions__icon-wrap">
          <Heart size={22} />
        </span>
        <span>Wishlist</span>
      </Link>

      <Link href="/cart" className="header-actions__item">
        <span className="header-actions__icon-wrap">
          <ShoppingCart size={22} />
          <span className="header-actions__badge">{cartCount}</span>
        </span>
        <span>Cart</span>
      </Link>
    </div>
  );
}
