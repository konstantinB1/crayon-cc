import { useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

export default function useAnimations(totalItems: number) {
    const prevItems = useRef<number | null>();

    const cartControls = useAnimation();
    const numberControls = useAnimation();

    useEffect(() => {
        if (totalItems > prevItems.current && prevItems.current !== null) {
            cartControls.start({
                scale: [1, 1.1, 1],
                transition: {
                    duration: 0.5,
                    ease: "circOut",
                },
            });
            numberControls.start({
                scale: [1, 1.1, 1],
                transition: {
                    duration: 0.5,
                    ease: "circOut",
                },
            });
        }

        prevItems.current = totalItems;
    }, [cartControls, totalItems, numberControls]);

    return {
        cartControls,
        numberControls,
    };
}
