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
  hasHydrated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
  updateUser: (user: User) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      hasHydrated: false,

      login: (user, token) => {
        // Cookie set 
        if (typeof window !== "undefined") {
          document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Lax`;
        }

        set({
          user,
          accessToken: token,
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
        });
      },

      updateUser:(user)=> set({user}),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "admin-auth",
      
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);