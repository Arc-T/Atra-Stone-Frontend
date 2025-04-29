import { create } from "zustand";

interface AddToCartResult {
  success: boolean;
  error?: string;
}

interface CartState {
  cartIds: number[];
  addToCart: (id: number) => AddToCartResult;
  removeFromCart: (id: number) => void;
  loadCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cartIds: [],
  loadCart: () => {
    const stored = localStorage.getItem("cart");
    const parsed = stored ? stored.split(",").map(Number) : [];
    set({ cartIds: parsed });
  },
  addToCart: (id) => {
    let result = { success: true, error: "" };
    set((state) => {
      if (state.cartIds.includes(id)) {
        result = { success: false, error: "محصول قبلاً به سبد خرید اضافه شده است" };
        return state;
      }
      const updated = [...state.cartIds, id];
      localStorage.setItem("cart", updated.join(","));
      return { cartIds: updated };
    });
    return result;
  },
  removeFromCart: (id) => {
    set((state) => {
      const updated = state.cartIds.filter((item) => item !== id);
      localStorage.setItem("cart", updated.join(","));
      return { cartIds: updated };
    });
  },
}));

export default useCartStore;
