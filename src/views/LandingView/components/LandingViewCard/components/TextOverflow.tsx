import { Box, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type TextOverflowProps = {
    text: string;
};

const TEXT_LINE_HEIGHT = 24;

export default function TextOverflow({ text }: TextOverflowProps) {
    const titleRef = useRef<HTMLParagraphElement | null>(null);
    const bounds = useRef<DOMRect | null>(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const {
        palette: {
            background: { paper: paperBg },
        },
    } = useTheme();

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
                {isHover && (
                    <motion.div
                        style={{
                            position: "absolute",
                            height: bounds?.current?.height + TEXT_LINE_HEIGHT,
                            backgroundColor: paperBg,
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                    >
                        <Typography variant="h5">{text}</Typography>
                    </motion.div>
                )}
            </AnimatePresence>
            <Typography
                ref={titleRef}
                variant="h5"
                textOverflow={isOverflow ? "ellipsis" : "initial"}
                overflow={isOverflow ? "hidden" : "initial"}
                whiteSpace={isOverflow ? "nowrap" : "initial"}
            >
                {text}
            </Typography>
        </Box>
    );
}
