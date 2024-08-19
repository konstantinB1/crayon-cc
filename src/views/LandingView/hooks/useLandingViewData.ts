import useBoundStore from "@/store";
import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { placeholderBeers } from "../LandingView.utils";

export default function useLandingViewData() {
    const fetchedInitial = useBoundStore((state) => state.fetchedInitial);
    const viewBeers = useBoundStore(useShallow((state) => state.viewBeers));
    const rootRef = useRef<HTMLDivElement | null>(null);
    const beers = fetchedInitial ? viewBeers : placeholderBeers;

    return {
        beers,
        rootRef,
        fetchedInitial,
    };
}
