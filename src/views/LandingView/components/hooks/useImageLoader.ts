import { type RefObject, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export default function useImageLoader(
    rootRef: RefObject<HTMLDivElement>,
    image?: string,
) {
    const isIntersecting = useIntersectionObserver(rootRef.current);
    const img = useRef<string | undefined>(undefined);
    const [exists, setExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isIntersecting && image) {
            const get = new Image();

            get.onload = () => {
                img.current = get.src;
                setExists(true);
                setLoading(false);
            };

            get.onerror = () => {
                setExists(false);
                setLoading(false);
            };

            get.src = image;
        }
    }, [image, isIntersecting]);

    return { exists, loading };
}
