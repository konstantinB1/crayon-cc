import { type RefObject, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export default function useImageLoader(
    rootRef: RefObject<HTMLDivElement>,
    image?: string,
) {
    const isIntersecting = useIntersectionObserver(rootRef);
    const imgRef = useRef<string | undefined>(undefined);
    const [exists, setExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isIntersecting && image) {
            const img = new Image();

            img.onload = () => {
                imgRef.current = img.src;
                setExists(true);
                setLoading(false);
            };

            img.onerror = () => {
                setExists(false);
                setLoading(false);
            };

            img.src = image;
        }
    }, [image, isIntersecting]);

    return { exists, loading };
}
