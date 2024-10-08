import { FormState, OrderBy } from "@/types";
import { Beer } from "./api-beers";
import {
    priceToInt,
    sortObject,
    sortByNumbersAndStrings,
} from "@/utils/order-utils";

// Based on api response keys
export enum SortKey {
    priceAsc = "price-asc",
    priceDesc = "price-desc",
    nameAsc = "name-asc",
    nameDesc = "name-desc",
    ratingAsc = "rating.average-asc",
    ratingDesc = "rating.average-desc",
}

export const sortBeers = (draft: Beer[], key: SortKey) => {
    const [prop, order] = key.split("-") as [keyof Beer, OrderBy];
    return sortObject(draft, prop, order, sortByNumbersAndStrings);
};

export const filterBeers = (beers: Beer[], [min, max]: number[]) =>
    beers.filter((beer) => {
        const price = priceToInt(beer.price);
        return price >= min && price <= max;
    });

const ensureValidInt = (value: number, def: number = 0) =>
    value === Infinity || value === -Infinity || isNaN(value) ? def : value;

const MAX_ESTIMATE = 120;
export const getMinMaxPrice = (beers: Beer[]) => {
    const prices = beers.map(({ price }) => priceToInt(price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return [ensureValidInt(min), ensureValidInt(max, MAX_ESTIMATE)];
};

export const applySort = (beers: Beer[], { sortKey, priceRange }: FormState) =>
    filterBeers(sortBeers(beers, sortKey), priceRange);
