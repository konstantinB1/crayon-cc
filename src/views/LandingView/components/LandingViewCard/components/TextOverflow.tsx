import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type TextOverflowProps = {
    text: string;
};

const TEXT_LINE_HEIGHT = 24;

export default function TextOverflow({ text }: TextOverflowProps) {
    const titleRef = useRef<HTMLParagraphElement | null>(null);
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
    }, []);

    return (
        <Box
            height={24}
            position="relative"
            onMouseEnter={() => {
                if (isOverflow) {
                    setIsHover(true);
                }
            }}
            onMouseLeave={() => {
                if (isOverflow) {
                    setIsHover(false);
                }
            }}
        >
            <AnimatePresence>
                {isHover && isOverflow && (
                    <motion.div
                        style={{
                            position: "absolute",
                            height:
                                bounds?.current?.height + 2 * TEXT_LINE_HEIGHT,
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            zIndex: 100,
                            padding: "0 12px",
                            width: "calc(100% - 24px)",
                        }}
                        animate={{
                            opacity: 1,
                        }}
                    >
                        <Typography sx={{}} variant="h6">
                            {text}
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>
            <Typography
                ref={titleRef}
                padding="0 12px"
                variant="h6"
                sx={{
                    visibility: isHover ? "hidden" : "visible",
                }}
                textOverflow={isOverflow ? "ellipsis" : "initial"}
                overflow={isOverflow ? "hidden" : "initial"}
                whiteSpace={isOverflow ? "nowrap" : "initial"}
            >
                {text}
            </Typography>
        </Box>
    );
}
