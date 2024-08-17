import {
    getMinMaxPrice as _getMinAndMaxPrice,
    SortKey,
} from "@/services/beer/beers-utils";
import useBoundStore from "@/store";
import { useCallback, useEffect, useMemo, useRef } from "react";

export default function useFilter() {
    const appliedInitial = useRef(false);
    const {
        beers,
        fetchedInitial,
        sortAction: sortAction,
        formState,
        setViewBeers,
        applyInitialFilter,
        setPriceRange: _setPriceRange,
        updatePriceRange,
    } = useBoundStore();

    const getMinAndMaxPrice = useMemo(() => _getMinAndMaxPrice(beers), [beers]);

    const clear = useCallback(() => {
        setViewBeers(beers);
    }, [beers, setViewBeers]);

    const sortBy = useCallback(
        (key: SortKey) => {
            sortAction(key);
        },
        [sortAction],
    );

    const setPriceRange = useCallback(
        (range: number[]) => _setPriceRange(beers, range),
        [_setPriceRange, beers],
    );

    useEffect(() => {
        if (fetchedInitial && !appliedInitial.current) {
            appliedInitial.current = true;
            applyInitialFilter(beers);
        }
    }, [applyInitialFilter, beers, fetchedInitial]);

    return {
        sortBy,
        setPriceRange,
        updatePriceRange,
        formState,
        getMinAndMaxPrice,
        clear,
    };
}
