import { CartState } from "./cart";
import { BeerFilterStore } from "./filter";
import { BeerRootStore } from "./root";

export type CombinedStore = CartState & BeerRootStore & BeerFilterStore;
