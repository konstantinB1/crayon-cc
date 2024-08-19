import { StateCreator } from "zustand";
import { Beer } from "../services/beer/api-beers";
import { CombinedStore } from "./types";

export type BeerCrudStore = {
    addBeer: (beer: Beer) => void;

    updateBeer: (beer: Beer) => void;
    deleteBeer: (id: number) => void;
};

export const createBeerCrudStore: StateCreator<
    CombinedStore,
    [],
    [],
    BeerCrudStore
> = (set) => ({
    addBeer: (beer) => {
        set((state) => {
            const beers = [beer, ...state.beers];
            return {
                beers,
                viewBeers: beers,
            };
        });
    },
    updateBeer: (beer) => {
        set((state) => ({
            beers: state.beers.map((b) => (b.id === beer.id ? beer : b)),
            viewBeers: state.viewBeers.map((b) =>
                b.id === beer.id ? beer : b,
            ),
        }));
    },
    deleteBeer: (id) => {
        set((state) => ({
            beers: state.beers.filter((b) => b.id !== id),
            viewBeers: state.viewBeers.filter((b) => b.id !== id),
        }));
    },
});
