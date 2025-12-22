import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      addTocart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== product.id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
