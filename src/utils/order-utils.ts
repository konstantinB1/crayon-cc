import { OrderBy } from "@/types";
import { getByPath } from "./object-utils";

export const priceToInt = (price?: string | number) => {
    if (typeof price === "number") {
        return price;
    }

    try {
        if (typeof price === "string") {
            return parseFloat(price?.replace("$", ""));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        if (typeof price === "string") {
            return parseFloat(price);
        }

        throw new Error("We have a problem with priceToInt function");
    }
};

export const getPriceRanges = <T extends { price: string | number }>(
    list: T[],
) => {
    const prices = list?.map(
        (item) =>
            (typeof item.price === "number" ||
                typeof item.price === "string") &&
            priceToInt(item.price),
    );
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return {
        min,
        max,
    };
};

/**
 * Proirity of sorting:
 * 1. Numbers
 * 2. Non word characters
 * 3. Uppercase letters
 * 4. Lowercase letters
 */
export const sortByNumbersAndStrings = <T>(a: T, b: T, value: OrderBy) => {
    if (value === "asc") {
        if (typeof a === "number" && typeof b === "number") {
            return a - b;
        }

        if (typeof a === "string" && typeof b === "string") {
            return (a as string).localeCompare(b as string);
        }

        return typeof a === "number" ? -1 : 1;
    }

    if (typeof a === "number" && typeof b === "number") {
        return b - a;
    }

    if (typeof a === "string" && typeof b === "string") {
        return (b as string).localeCompare(a as string);
    }

    return typeof a === "number" ? -1 : 1;
};

export const sortObject = <T>(
    arr: T[],
    key: keyof T,
    order: OrderBy,
    comparator: <K>(a: K, b: K, value: OrderBy) => number,
) =>
    arr
        .slice()
        .sort((a, b) =>
            comparator(
                getByPath(a, key as string),
                getByPath(b, key as string),
                order,
            ),
        );
