// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthState {
//   user: { email: string } | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   error: string | null;
//   setUser: (user: { email: string } | null) => void;
//   setToken: (token: string | null) => void;
//   setError: (error: string | null) => void;
//   logout: () => void;
// }

// const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,
//       error: null,

//       setUser: (user) => set({ user, isAuthenticated: !!user }),
//       setToken: (token) => set({ token }),
//       setError: (error) => set({ error }),

//       logout: () => set({ user: null, token: null, isAuthenticated: false }),
//     }),
//     {
//       name: "auth-storage", // Stores in localStorage
//     }
//   )
// );

// // Helper functions
// export const getToken = () => useAuthStore.getState().token;
// export const isAuthenticated = () => useAuthStore.getState().isAuthenticated;

// export default useAuthStore;
