import { create } from "zustand";
import { CartState, createCartStore } from "./cart";
import { BeerFilterStore, createBeerFilterStore } from "./filter";
import { BeerRootStore, createBeerRootStore } from "./root";

const useBoundStore = create<CartState & BeerFilterStore & BeerRootStore>()(
    (...a) => ({
        ...createCartStore(...a),
        ...createBeerFilterStore(...a),
        ...createBeerRootStore(...a),
    }),
);

export default useBoundStore;
