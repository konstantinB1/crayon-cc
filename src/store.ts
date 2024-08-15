import { create } from "zustand";
import { Beer } from "./api/beers";

export type BearStore = {
    beers: Beer[];
    currentBeer: Beer | null;
    setAllBeers: (beers: Beer[]) => void;
    setFetchInitial: () => void;
    setFetching: (fetching: boolean) => void;
    fetchedInitial: boolean;
    fetching: boolean;
};

export const useBearStore = create<BearStore>((set) => ({
    beers: [],
    fetching: false,
    fetchedInitial: false,
    currentBeer: null,
    setAllBeers: (beers: Beer[]) =>
        set(
            (s) => ({
                ...s,
                beers,
            }),
            true,
        ),
    setFetchInitial: () => set({ fetchedInitial: true }),
    setFetching: (fetching: boolean) => set({ fetching }),
}));
