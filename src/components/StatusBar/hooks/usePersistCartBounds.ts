import { setCartBounds } from "@/utils/storage";
import { RefObject, useEffect, useRef } from "react";

export default function usePersistCartBounds(
    cartRef: RefObject<HTMLButtonElement>,
) {
    const listener = useRef<() => void>();

    useEffect(() => {
        if (listener.current) {
            return;
        }

        listener.current = () => {
            const cart = cartRef.current;

            if (!cart) {
                return;
            }

            const bounds = cart.getBoundingClientRect();

            setCartBounds(bounds);
        };

        window.addEventListener("resize", listener.current);
        document.addEventListener("scroll", listener.current);

        listener.current();

        return () => {
            window.removeEventListener("resize", listener.current);
            document.removeEventListener("scroll", listener.current);
        };
    });
}
