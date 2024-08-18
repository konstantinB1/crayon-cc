import { useEffect, useRef } from "react";
import { getBeers } from "../services/beer/api-beers";
import useBoundStore from "@/store";

const POOLING_INTERVAL = 3000;

export default function useGetBeers() {
    const interval = useRef(null);

    const setFetching = useBoundStore((state) => state.setFetching);
    const setAllBeers = useBoundStore((state) => state.setAllBeers);
    const setFetchInitial = useBoundStore((state) => state.setFetchInitial);
    const fetchedInitial = useBoundStore((state) => state.fetchedInitial);

    useEffect(() => {
        if (fetchedInitial) {
            return;
        }

        async function tryFetchBeers() {
            try {
                if (interval.current) {
                    clearInterval(interval.current);
                }

                const beers = await getBeers();

                setFetchInitial();
                setAllBeers(beers);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                // Ignore
            } finally {
                setFetching(false);
            }
        }

        interval.current = setInterval(tryFetchBeers, POOLING_INTERVAL);

        tryFetchBeers();

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [fetchedInitial, setAllBeers, setFetchInitial, setFetching]);
}
