import { type RefObject, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export const PLACEHOLDER_SRC =
    "https://www.totalwine.com/media/sys_master/cmsmedia/hff/h0e/8979036078110.png";

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
