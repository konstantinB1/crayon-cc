import { getMinMaxPrice as _getMinAndMaxPrice } from "@/services/beer/beers-utils";
import useBoundStore from "@/store";
import { useCallback, useEffect, useMemo, useRef } from "react";

export default function useFilter() {
    const appliedInitial = useRef(false);

    const beers = useBoundStore((state) => state.beers);
    const setViewBeers = useBoundStore((state) => state.setViewBeers);
    const applyInitialFilter = useBoundStore(
        (state) => state.applyInitialFilter,
    );

    const sortBy = useBoundStore((state) => state.sortAction);
    const updatePriceRange = useBoundStore((state) => state.updatePriceRange);
    const formState = useBoundStore((state) => state.formState);
    const _setPriceRange = useBoundStore((state) => state.setPriceRange);
    const fetchedInitial = useBoundStore((state) => state.fetchedInitial);

    const getMinAndMaxPrice = useMemo(() => _getMinAndMaxPrice(beers), [beers]);

    const clear = useCallback(() => {
        setViewBeers(beers);
    }, [beers, setViewBeers]);

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
