import { RefObject, useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(
    root: RefObject<HTMLDivElement>,
) {
    const observer = useRef<IntersectionObserver | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        if (observer.current || root.current == null) {
            return;
        }

        observer.current = new IntersectionObserver(
            (entry) => {
                entry.forEach((e) => {
                    if (e.isIntersecting) {
                        setIsIntersecting(true);
                        observer.current?.unobserve(e.target);
                    }
                });
            },
            {
                root: document,
                rootMargin: "0px",
                threshold: 0.1,
            },
        );

        observer.current.observe(root.current);

        return () => {
            observer.current?.disconnect();
        };
    }, [root]);

    return isIntersecting;
}
