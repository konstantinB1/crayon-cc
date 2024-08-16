import { create } from "zustand";
import { Beer } from "../services/beer/api-beers";
import { FormState } from "@/types";
import {
    applySort,
    getMinMaxPrice,
    sortBeers,
    SortKey,
} from "@/services/beer/beers-utils";

export type BeerFilterStore = {
    // Beers to be displayed
    viewBeers: Beer[];

    // Set the beers to be displayed
    setViewBeers: (beers: Beer[]) => void;

    // Form state that will be used to filter the beers
    formState: FormState;

    applyInitialFilter: (beers: Beer[]) => void;
    sortAction: (key: SortKey) => void;

    setPriceRange: (beers: Beer[], priceRange: number[]) => void;
    updatePriceRange: (priceRange: number[]) => void;
};

const initialFormState: FormState = {
    priceRange: [0, 0],
    sortKey: SortKey.nameAsc,
};

export const useBeerFilterStore = create<BeerFilterStore>((set, get) => ({
    viewBeers: [],
    formState: initialFormState,
    setViewBeers: (beers: Beer[]) => set({ viewBeers: beers }),
    applyInitialFilter: (beers: Beer[]) => {
        const nextFormState = {
            ...initialFormState,
            priceRange: getMinMaxPrice(beers),
        };

        return set(() => ({
            viewBeers: applySort(beers, nextFormState),
            formState: nextFormState,
        }));
    },

    sortAction: (key) =>
        set(({ formState, viewBeers }) => ({
            viewBeers: sortBeers(viewBeers, key),
            formState: { ...formState, sortKey: key },
        })),

    setPriceRange: (beers, priceRange) => {
        const { formState } = get();
        const nextFormState: FormState = {
            ...formState,
            priceRange,
        };

        return set(() => ({
            viewBeers: applySort(beers, nextFormState),
            formState: nextFormState,
        }));
    },

    updatePriceRange: (priceRange) =>
        set(({ formState }) => ({
            formState: { ...formState, priceRange },
        })),
}));
