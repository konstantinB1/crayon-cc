import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useShowFilter() {
    const [showCartPreview, setShowCartPreview] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterIcon, setShowFilterIcon] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setShowFilterIcon(location.pathname === "/");
        setShowFilter(false);
        setMenuOpen(false);
    }, [location.pathname]);

    return {
        showFilter,
        showFilterIcon,
        menuOpen,
        setShowFilter,
        setMenuOpen,
        showCartPreview,
        setShowCartPreview,
    };
}
