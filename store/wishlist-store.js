import { create } from "zustand";

/**
 * Wishlist store — local state now, swap in API calls later:
 *   fetchWishlist() -> GET    /api/wishlist
 *   toggle(product)  -> POST/DELETE /api/wishlist/:productId
 */
export const useWishlistStore = create((set, get) => ({
  items: [], // { id, productId, name, image, price }
  isLoading: false,

  itemCount: () => get().items.length,

  isWishlisted: (id) => get().items.some((i) => i.id === id),

  toggle: (product) =>
    set((state) => {
      const exists = state.items.some((i) => i.id === product.id);
      return {
        items: exists
          ? state.items.filter((i) => i.id !== product.id)
          : [...state.items, product],
      };
    }),

  setItems: (items) => set({ items }),
  setLoading: (isLoading) => set({ isLoading }),
}));
