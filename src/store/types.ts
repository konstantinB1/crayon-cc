import { CartState } from "./cart";
import { BeerCrudStore } from "./crud";
import { BeerFilterStore } from "./filter";
import { BeerRootStore } from "./root";

export type CombinedStore = CartState &
    BeerRootStore &
    BeerFilterStore &
    BeerCrudStore;
