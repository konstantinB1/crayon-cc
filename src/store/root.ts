import { StateCreator } from "zustand";
import { Beer } from "../services/beer/api-beers";
import { CombinedStore } from "./types";

export enum AppStatus {
    unknown = "unknown",
    online = "online",
    offline = "offline",
    onlineWithLoadedData = "onlineWithLoadedData",
    offlineWithLoadedData = "offlineWithLoadedData",
    offlineWithNoData = "offlineWithNoData",
    onlineWithNoData = "onlineWithNoData",
    apiError = "apiError",
}

export type BeerRootStore = {
    // All beers fetched from the API
    beers: Beer[];

    // All bears that will be used as
    // source of truth for all derived states
    setAllBeers: (beers: Beer[]) => void;

    // Is fetching data
    setFetching: (fetching: boolean) => void;

    // Flag to indicate if the initial data has been fetched
    fetchedInitial: boolean;

    // Currently fetching the API
    fetching: boolean;

    appStatus: AppStatus;

    setAppStatus: (status: AppStatus) => void;
};

export const createBeerRootStore: StateCreator<
    CombinedStore,
    [],
    [],
    BeerRootStore
> = (set) => ({
    beers: [],
    fetching: true,
    fetchedInitial: false,
    appStatus: AppStatus.unknown,

    setAllBeers: (beers: Beer[]) => set({ beers, fetchedInitial: true }),
    setFetching: (fetching: boolean) => set({ fetching }),
    setAppStatus: (appStatus: AppStatus) => set({ appStatus }),
});
