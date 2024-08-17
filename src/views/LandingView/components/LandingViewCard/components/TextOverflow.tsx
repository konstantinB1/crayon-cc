import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import useOverflowDetect from "./hooks/useOverflowDetect";

export type TextOverflowProps = {
    text: string;
};

const TEXT_LINE_HEIGHT = 24;

export default function TextOverflow({ text }: TextOverflowProps) {
    const titleRef = useRef<HTMLParagraphElement | null>(null);
    const { bounds, isOverflow, isHover, setIsHover } =
        useOverflowDetect(titleRef);

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
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
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
