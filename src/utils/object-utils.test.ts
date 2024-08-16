import { describe, expect } from "@jest/globals";
import { getByPath } from "./object-utils";

describe("object-utils", () => {
    describe("getByPath", () => {
        it("should return the value of the path", () => {
            expect(
                getByPath(
                    {
                        average: {
                            rating: 1,
                        },
                    },
                    "average.rating",
                ),
            ).toBe(1);
        });
    });
});
