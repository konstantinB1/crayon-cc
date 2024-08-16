import { FormState, OrderBy } from "@/types";
import { Beer } from "./api-beers";
import {
    priceToInt,
    sortObject,
    sortByNumbersAndStrings,
} from "@/utils/order-utils";

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

    return sortObject(
        draft.map(({ price, ...rest }) => ({
            ...rest,
            price: priceToInt(price),
        })),
        prop,
        order,
        sortByNumbersAndStrings,
    );
};

export const filterBeers = (beers: Beer[], value: number[]) => {
    const [min, max] = value;
    return beers.filter((beer) => {
        const price = priceToInt(beer.price);
        return price >= min && price <= max;
    });
};

const ensureValidInt = (value: number, def: number = 0) =>
    value === Infinity || value === -Infinity || isNaN(value) ? def : value;

export const getMinMaxPrice = (beers: Beer[]) => {
    const prices = beers.map(({ price }) => priceToInt(price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return [ensureValidInt(min), ensureValidInt(max, 1000)];
};

export const applySort = (beers: Beer[], { sortKey, priceRange }: FormState) =>
    filterBeers(sortBeers(beers, sortKey), priceRange);

export const removeSingleItemFromArr = (arr: number[], id: number) => {
    const index = arr.indexOf(id);
    if (index === -1) return arr;
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
