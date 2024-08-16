import { Beer } from "@/services/beer/api-beers";
import {
    getMinMaxPrice as _getMinAndMaxPrice,
    SortKey,
} from "@/services/beer/beers-utils";
import { useBeerFilterStore, useBeerRootStore } from "@/store";
import { useCallback, useEffect, useMemo, useRef } from "react";

export default function useFilter() {
    const appliedInitial = useRef(false);
    const { beers, fetchedInitial } = useBeerRootStore(
        ({ beers, fetchedInitial }) => ({ beers, fetchedInitial }),
    );

    const {
        viewBeers,
        sortAction: sortAction,
        formState,
        setViewBeers,
        applyInitialFilter,
        setPriceRange: _setPriceRange,
        updatePriceRange,
    } = useBeerFilterStore(
        ({
            viewBeers,
            setViewBeers,
            sortAction,
            formState,
            updatePriceRange,
            setPriceRange,
            applyInitialFilter,
        }) => ({
            viewBeers,
            setViewBeers,
            updatePriceRange,
            sortAction,
            setPriceRange,
            formState,
            applyInitialFilter,
        }),
    );

    const draft = useRef<Beer[]>([]);

    const getMinAndMaxPrice = useMemo(() => _getMinAndMaxPrice(beers), [beers]);

    if (draft.current.length === 0) {
        draft.current = viewBeers;
    }

    const clear = useCallback(() => {
        draft.current = viewBeers;
        setViewBeers(beers);
    }, [beers, setViewBeers, viewBeers]);

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
