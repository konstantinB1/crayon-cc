import { describe, expect, it } from "@jest/globals";
import { applySort, filterBeers, sortBeers, SortKey } from "./beers-utils";
import { Beer } from "./api-beers";
import { FormState } from "@/types";

describe("beers-utils", () => {
    describe("sortBeers", () => {
        it.each([
            {
                input: [
                    { name: "c" },
                    { name: "d" },
                    {
                        name: "__99",
                    },
                    { name: "a" },
                ],
                key: SortKey.nameAsc,
                expected: [
                    { name: "__99" },
                    { name: "a" },
                    { name: "c" },
                    { name: "d" },
                ],
            },
            {
                input: [
                    { price: "11" },
                    { price: 12 },
                    {
                        price: "$11.99",
                    },
                    { price: "500" },
                    { price: "$999" },
                ],
                key: SortKey.priceDesc,
                expected: [
                    { price: 11 },
                    { price: 11.99 },
                    { price: 12 },
                    { price: 500 },
                    { price: 999 },
                ],
            },
        ])(
            "should return $expected for specific input",
            ({ input, expected, key }) =>
                expect(sortBeers(input as Beer[], key)).toMatchObject(expected),
        );
    });

    describe("filterBeers", () => {
        it.each([
            {
                input: [
                    { price: 11 },
                    { price: 12 },
                    { price: 13 },
                    { price: 14 },
                    { price: 15 },
                ],
                value: [12, 14],
                expected: [{ price: 12 }, { price: 13 }, { price: 14 }],
            },
            {
                input: [
                    { price: 11 },
                    { price: 1 },
                    { price: 12 },
                    { price: 14 },
                    { price: 3 },
                    { price: 15 },
                    { price: 200 },
                    { price: 400 },
                ],
                value: [11, 15],
                expected: [
                    { price: 11 },
                    { price: 12 },
                    { price: 14 },
                    { price: 15 },
                ],
            },
        ])(
            "if value is $value should return values between the range",
            ({ input, expected, value }) =>
                expect(
                    filterBeers(input as Beer[], value as number[]),
                ).toMatchObject(expected),
        );
    });

    describe("applySort", () => {
        it.each([
            {
                beers: [
                    {
                        name: "c",
                        price: 11,
                    },
                    {
                        name: "d",
                        price: 111,
                    },
                    {
                        name: "a",
                        price: 1,
                    },
                    {
                        name: "__99",
                        price: 232,
                    },
                    {
                        name: "t",
                        price: 500,
                    },
                    {
                        name: "__99",
                        price: 232,
                    },
                    {
                        name: "a",
                        price: 500,
                    },
                ],
                formState: {
                    sortKey: SortKey.priceAsc,
                    priceRange: [1, 20],
                },
                expected: [
                    { name: "a", price: 1 },
                    { name: "c", price: 11 },
                ],
            },
        ])(
            "should return initial sort object",
            ({ beers, formState, expected }) =>
                expect(
                    applySort(beers as Beer[], formState as FormState),
                ).toMatchObject(expected),
        );
    });
});
