import { useEffect, useRef } from "react";
import { getBeers } from "../services/beer/api-beers";
import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";

const POOLING_INTERVAL = 3000;

export default function useGetBeers() {
    const interval = useRef(null);

    const setFetching = useBoundStore((state) => state.setFetching);
    const setAllBeers = useBoundStore((state) => state.setAllBeers);
    const fetchedInitial = useBoundStore((state) => state.fetchedInitial);
    const setStatus = useBoundStore((state) => state.setAppStatus);

    useEffect(() => {
        if (fetchedInitial) {
            return;
        }

        async function tryFetchBeers() {
            try {
                const beers = await getBeers();

                if (interval.current) {
                    clearInterval(interval.current);
                }

                setAllBeers(beers);
                setStatus(AppStatus.onlineWithLoadedData);
            } catch (err) {
                const e = err as Error;

                if (e.message === "Failed to fetch") {
                    setStatus(AppStatus.offline);
                } else {
                    setStatus(AppStatus.apiError);
                }
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
    }, [fetchedInitial, setAllBeers, setFetching, setStatus]);
}
