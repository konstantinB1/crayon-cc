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

export const getMinMaxPrice = (beers: Beer[]) => {
    const prices = beers.map(({ price }) => priceToInt(price));
    return [Math.min(...prices), Math.max(...prices)];
};

export const applySort = (beers: Beer[], { sortKey, priceRange }: FormState) =>
    filterBeers(sortBeers(beers, sortKey), priceRange);
