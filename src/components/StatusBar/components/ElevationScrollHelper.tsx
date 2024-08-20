import { useScrollTrigger } from "@mui/material";
import { cloneElement, ReactElement } from "react";

export default function ElevationScroll({
    children,
}: {
    children: ReactElement;
}) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return cloneElement(children, {
        elevation: trigger ? 1 : 0,
    });
}
