import { Beer } from "@/services/beer/api-beers";
import useBoundStore from "@/store";
import { sortByNumbersAndStrings, sortObject } from "@/utils/order-utils";
import { useMemo } from "react";

export default function useMetrics() {
    const { beers } = useBoundStore();

    const sortByHighestAvg = useMemo(
        () =>
            sortObject(
                beers,
                "rating.average",
                "desc",
                sortByNumbersAndStrings,
            ),
        [beers],
    );

    const sortByLowestAvg = useMemo(
        () =>
            sortObject(beers, "rating.average", "asc", sortByNumbersAndStrings),
        [beers],
    );

    const getAllAvgByBrewery = useMemo(
        () =>
            beers.reduce(
                (acc, cur) => {
                    if (acc[cur.brewery]) {
                        acc[cur.brewery].push(cur.rating);
                    } else {
                        acc[cur.brewery] = [cur.rating];
                    }

                    return acc;
                },
                {} as Record<string, Beer["rating"][]>,
            ),
        [beers],
    );

    const getByMostReviews = useMemo(() => {
        const data = Object.entries(getAllAvgByBrewery);
        const sum = data.map(([brewery, ratings]) => {
            const sum = ratings.reduce((acc, cur) => acc + cur.reviews, 0);
            return { brewery, sum };
        });

        return sortObject(sum, "sum", "desc", sortByNumbersAndStrings);
    }, [getAllAvgByBrewery]);

    return {
        getByMostReviews,
        getAllAvgByBrewery,
    };
}
