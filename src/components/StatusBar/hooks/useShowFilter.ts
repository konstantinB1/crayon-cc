import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useShowFilter() {
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterIcon, setShowFilterIcon] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setShowFilterIcon(location.pathname === "/");

        setShowFilter((prev) => prev && location.pathname === "/");
    }, [location.pathname]);

    return { showFilter, showFilterIcon, setShowFilter };
}
