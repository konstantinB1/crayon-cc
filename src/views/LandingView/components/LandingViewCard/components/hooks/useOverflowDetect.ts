import { useEffect, useRef, useState } from "react";

const TEXT_LINE_HEIGHT = 24;

export default function useOverflowDetect(
    titleRef: React.RefObject<HTMLParagraphElement>,
) {
    const bounds = useRef<DOMRect | null>(null);
    const [isOverflow, setIsOverflow] = useState(true);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        setIsOverflow((curState) => {
            if (curState) {
                return true;
            }

            bounds.current = titleRef?.current?.getBoundingClientRect();
            const elHeight = titleRef?.current.getBoundingClientRect().height;
            return elHeight > TEXT_LINE_HEIGHT;
        });
    }, [titleRef]);

    return {
        bounds,
        isOverflow,
        isHover,
        setIsHover,
    };
}
