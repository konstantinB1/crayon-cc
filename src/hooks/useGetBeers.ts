import { useEffect } from "react";
import { getBeers } from "../api/beers";
import { useBearStore } from "../store";

export default function useGetBeers() {
    const { setAllBeers, setFetching, setFetchInitial, fetchedInitial } =
        useBearStore(
            ({
                setAllBeers,
                setFetchInitial,
                setFetching,
                fetchedInitial,
            }) => ({
                setAllBeers,
                setFetchInitial,
                setFetching,
                fetchedInitial,
            }),
        );

    useEffect(() => {
        if (fetchedInitial) {
            return;
        }

        setFetching(true);

        getBeers()
            .then((beers) => setAllBeers(beers))
            .finally(() => {
                setFetchInitial();
                setFetching(false);
            });
    }, [fetchedInitial, setAllBeers, setFetchInitial, setFetching]);
}
