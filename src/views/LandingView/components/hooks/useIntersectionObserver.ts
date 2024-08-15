import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(root: HTMLElement) {
    const observer = useRef<IntersectionObserver | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        if (observer.current || root == null) {
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
                rootMargin: "10px",
                threshold: 1,
            },
        );

        observer.current.observe(root);

        return () => {
            observer.current?.disconnect();
        };
    }, [root]);

    return isIntersecting;
}
