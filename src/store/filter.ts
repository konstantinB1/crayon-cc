import { StateCreator } from "zustand";
import { Beer } from "../services/beer/api-beers";
import { FormState } from "@/types";
import {
    applySort,
    getMinMaxPrice,
    sortBeers,
    SortKey,
} from "@/services/beer/beers-utils";
import { CombinedStore } from "./types";

export type BeerFilterStore = {
    // Beers to be displayed
    viewBeers: Beer[];

    // Set the beers to be displayed
    setViewBeers: (beers: Beer[]) => void;

    // Form state that will be used to filter the beers
    formState: FormState;

    // Apply initial values so the page loads with the correct beers
    applyInitialFilter: (beers: Beer[]) => void;

    // Sort the beers by key
    sortAction: (key: SortKey) => void;

    // Used by slider to set the price range
    setPriceRange: (beers: Beer[], priceRange: number[]) => void;

    // Update the price range in the form state
    updatePriceRange: (priceRange: number[]) => void;

    // Serarch the beers by name
    searchAction: (name: string) => void;

    // Apply the current filter
    applyCurrentFilter: () => void;
};

const initialFormState: FormState = {
    priceRange: [0, 0],
    sortKey: SortKey.nameAsc,
};

export const createBeerFilterStore: StateCreator<
    CombinedStore,
    [],
    [],
    BeerFilterStore
> = (set, get) => ({
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

    searchAction: (name) =>
        set({
            viewBeers:
                name === ""
                    ? get().beers
                    : get().beers.filter((beer) =>
                          beer.name.toLowerCase().includes(name.toLowerCase()),
                      ),
        }),

    applyCurrentFilter: () =>
        set(() => ({
            viewBeers: applySort(get().viewBeers, get().formState),
        })),
});
