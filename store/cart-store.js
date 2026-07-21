import { create } from "zustand";

/**
 * Cart store — currently holds local state only.
 * When the Cart API is ready, wire these actions to real requests:
 *   fetchCart()      -> GET  /api/cart              (hydrate `items` on app load / login)
 *   addItem(payload) -> POST /api/cart/items         (optimistic update + rollback on error)
 *   removeItem(id)   -> DELETE /api/cart/items/:id
 *   updateQty(id,qty)-> PATCH /api/cart/items/:id
 * The shape of `items` is intentionally kept API-friendly (id, productId, qty, price)
 * so no remapping is needed once the backend is connected.
 */
export const useCartStore = create((set, get) => ({
  items: [], // { id, productId, name, image, price, qty, variant }
  isLoading: false,

  itemCount: () => get().items.reduce((sum, item) => sum + item.qty, 0),

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty: item.qty || 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    })),

  clearCart: () => set({ items: [] }),

  // Placeholder for future API hydration
  setItems: (items) => set({ items }),
  setLoading: (isLoading) => set({ isLoading }),
}));
