import { create } from "zustand";
import { createCartStore } from "./cart";
import { createBeerFilterStore } from "./filter";
import { createBeerRootStore } from "./root";
import { CombinedStore } from "./types";

const useBoundStore = create<CombinedStore>()((...a) => ({
    ...createCartStore(...a),
    ...createBeerFilterStore(...a),
    ...createBeerRootStore(...a),
}));

export default useBoundStore;
