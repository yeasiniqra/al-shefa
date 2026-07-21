import { create } from "zustand";

/**
 * Auth store — single source of truth (no v1/v2 duplication).
 * Wire up later:
 *   login(credentials)  -> POST /api/auth/login   -> setUser(res.user)
 *   autoLogin()         -> GET  /api/auth/me      (called once on app boot, uses cookie/token)
 *   logout()            -> POST /api/auth/logout  -> clearUser()
 */
export const useAuthStore = create((set) => ({
  user: null, // { id, name, email, phone, avatar }
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
