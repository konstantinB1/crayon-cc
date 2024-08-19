import useBoundStore from "@/store";
import { Card, Box, IconButton, useScrollTrigger, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cloneElement, ReactElement, useEffect, useRef, useState } from "react";
import MenuCartPreview from "./components/MenuCartPreview";
import NavButton from "./components/NavButton";
import { motion, useAnimation } from "framer-motion";

function ElevationScroll({ children }: { children: ReactElement }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return cloneElement(children, {
        elevation: trigger ? 1 : 0,
    });
}

export default function StatusBar() {
    const [showCartPreview, setShowCartPreview] = useState(false);

    const getTotalItems = useBoundStore((state) => state.getTotalItems());

    const cartRef = useRef<HTMLButtonElement>(null);
    const prevItems = useRef<number | null>();

    const cartControls = useAnimation();
    const numberControls = useAnimation();

    useEffect(() => {
        if (getTotalItems > prevItems.current && prevItems.current !== null) {
            cartControls.start({
                scale: [1, 1.1, 1],
                transition: {
                    duration: 0.5,
                    ease: "circOut",
                },
            });
            numberControls.start({
                scale: [1, 1.1, 1],
                transition: {
                    duration: 0.5,
                    ease: "circOut",
                },
            });
        }

        prevItems.current = getTotalItems;
    }, [cartControls, getTotalItems, numberControls]);

    return (
        <ElevationScroll>
            <Card
                sx={{
                    position: "sticky",
                    top: 10,
                    zIndex: 10,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    pl: 2,
                    boxSizing: "border-box",
                    py: 1,
                }}
                elevation={1}
            >
                <Box flex={3} display="flex" gap={1} component="nav">
                    <NavButton to="/">Beers</NavButton>
                    <NavButton to="/product-management">
                        Product Management
                    </NavButton>
                </Box>
                <motion.div
                    animate={cartControls}
                    style={{
                        display: "flex",
                        marginRight: 10,
                    }}
                >
                    <IconButton
                        onClick={() => setShowCartPreview(!showCartPreview)}
                        ref={cartRef}
                        sx={{
                            borderRadius: 0,
                        }}
                    >
                        <Badge
                            badgeContent={
                                getTotalItems && (
                                    <motion.span animate={numberControls}>
                                        {getTotalItems}
                                    </motion.span>
                                )
                            }
                            color="primary"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </motion.div>
                {showCartPreview && (
                    <MenuCartPreview
                        onClose={() => setShowCartPreview(false)}
                        open={showCartPreview}
                        ref={cartRef}
                    />
                )}
            </Card>
        </ElevationScroll>
    );
}
