import { create } from "zustand";

export type CartProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  badge?: string;
  accent?: string;
  category?: string;
  quantity: number;
};

type CartState = {
  items: CartProduct[];
  itemCount: number;
  addItem: (product: Omit<CartProduct, "quantity">) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "365online-cart";

const readCartFromStorage = (): CartProduct[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const useCartStore = create<CartState>((set) => ({
  items: readCartFromStorage(),
  itemCount: readCartFromStorage().reduce((sum, item) => sum + item.quantity, 0),
  addItem: (product) =>
    set((state) => {
      const nextItems = [...state.items];
      const existingIndex = nextItems.findIndex((item) => item.id === product.id);

      if (existingIndex >= 0) {
        nextItems[existingIndex] = {
          ...nextItems[existingIndex],
          quantity: nextItems[existingIndex].quantity + 1,
          price: product.price,
          originalPrice: product.originalPrice,
          name: product.name,
          accent: product.accent,
          badge: product.badge,
          category: product.category,
        };
      } else {
        nextItems.push({ ...product, quantity: 1 });
      }

      const nextCount = nextItems.reduce((sum, item) => sum + item.quantity, 0);
      return { items: nextItems, itemCount: nextCount };
    }),
  updateQuantity: (id, delta) =>
    set((state) => {
      const nextItems = state.items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0);

      return {
        items: nextItems,
        itemCount: nextItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const nextItems = state.items.filter((item) => item.id !== id);
      return {
        items: nextItems,
        itemCount: nextItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }),
  clearCart: () => set({ items: [], itemCount: 0 }),
}));

useCartStore.subscribe((state) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }
});
