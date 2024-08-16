import { create } from "zustand";
import { Beer } from "../services/beer/api-beers";

export type BeerRootStore = {
    // All beers fetched from the API
    beers: Beer[];

    // All bears that will be used as
    // source of truth for all derived states
    setAllBeers: (beers: Beer[]) => void;

    // Is data ready
    setFetchInitial: () => void;

    // Is fetching data
    setFetching: (fetching: boolean) => void;

    // Flag to indicate if the initial data has been fetched
    fetchedInitial: boolean;

    // Currently fetching the API
    fetching: boolean;
};

export const useBeerRootStore = create<BeerRootStore>((set) => ({
    beers: [],
    fetching: false,
    fetchedInitial: false,
    setAllBeers: (beers: Beer[]) => set({ beers }),
    setFetchInitial: () => set({ fetchedInitial: true }),
    setFetching: (fetching: boolean) => set({ fetching }),
}));

export const useBeerStoreProxy = () => useBeerRootStore((state) => state);
