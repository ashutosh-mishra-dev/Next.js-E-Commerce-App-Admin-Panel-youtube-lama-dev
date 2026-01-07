import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
  setHasHydrated: (state: boolean) => void;
  syncWithCookie: () => void; 
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (user, token) => {
        // Cookie set 
        if (typeof window !== "undefined") {
          document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Lax`;
        }

    
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        // Cookie remove 
        if (typeof window !== "undefined") {
          document.cookie = "accessToken=; path=/; max-age=0";
        }

        // Store clear
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },

      setAccessToken: (token) => set({ accessToken: token }),
      setHasHydrated: (state) => set({ hasHydrated: state }),

      // sync with Cookie
      syncWithCookie: () => {
        if (typeof window === "undefined") return;

        // found token from cookie
        const cookieToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        const currentToken = get().accessToken;

        // Agar cookie mein token hai lekin store mein nahi
        if (cookieToken && !currentToken) {
          set({ accessToken: cookieToken, isAuthenticated: true });
        }
        // Agar store mein token hai lekin cookie mein nahi
        else if (!cookieToken && currentToken) {
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "admin-auth",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        // Hydration ke baad cookie se sync
        state?.syncWithCookie();
      },
    }
  )
);