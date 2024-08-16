import { create } from "zustand";

export type CartState = {
    items?: number[];

    add: (id: number) => void;

    remove: (id: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
    items: [],

    add: (id) => set((state) => ({ items: [...state.items, id] })),

    remove: (id) =>
        set((state) => ({ items: state.items.filter((item) => item !== id) })),
}));

export const useCartStoreProxy = () => useCartStore((state) => state);
