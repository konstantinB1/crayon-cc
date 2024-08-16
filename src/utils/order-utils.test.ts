import { expect, describe, it } from "@jest/globals";
import {
    priceToInt,
    getPriceRanges,
    sortObject,
    sortByNumbersAndStrings,
} from "./order-utils";

import { OrderBy } from "@/types";

describe("order-utils", () => {
    describe("priceToInt", () => {
        it.each([
            {
                input: "0",
                expected: 0,
            },
            {
                input: "$1000",
                expected: 1000,
            },
            {
                input: "$2.98",
                expected: 2.98,
            },
            {
                input: "$99.99",
                expected: 99.99,
            },
        ])(
            "should return $expected when input is $input",
            ({ input, expected }) => expect(priceToInt(input)).toBe(expected),
        );
    });

    describe("getPriceRanges", () => {
        it.each([
            {
                input: [
                    { price: 101 },
                    { price: 99 },
                    { price: 100 },
                    { price: 1 },
                ],
                expected: {
                    min: 1,
                    max: 101,
                },
            },
            {
                input: [{ price: 1 }, { price: 2 }, { price: 3 }, { price: 4 }],
                expected: {
                    min: 1,
                    max: 4,
                },
            },
        ])(
            "should return $expected for specific input",
            ({ input, expected }) =>
                expect(getPriceRanges(input)).toMatchObject(expected),
        );
    });

    describe("sortBeers", () => {
        it.each([
            {
                input: [
                    { name: "a" },
                    { name: "AA43" },
                    { name: "__Abc" },
                    { name: 43 },
                ],
                key: "name",
                value: "desc",
                expected: [
                    { name: 43 },
                    { name: "AA43" },
                    { name: "a" },
                    { name: "__Abc" },
                ],
            },
            {
                input: [
                    { price: 102 },
                    { price: 1 },
                    { price: 2 },
                    { price: 4 },
                ],
                key: "price",
                value: "asc",
                expected: [
                    { price: 1 },
                    { price: 2 },
                    { price: 4 },
                    { price: 102 },
                ],
            },
        ])(
            "should return valid sort value - $value",
            ({ input, expected, key, value }) =>
                expect(
                    sortObject(
                        input as never,
                        key,
                        value as OrderBy,
                        sortByNumbersAndStrings,
                    ),
                ).toMatchObject(expected),
        );
    });
});
