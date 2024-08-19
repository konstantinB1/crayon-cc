import useBoundStore from "@/store";
import {
    Box,
    IconButton,
    useScrollTrigger,
    Badge,
    AppBar,
    Toolbar,
    Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cloneElement, ReactElement, useEffect, useRef, useState } from "react";
import MenuCartPreview from "./components/MenuCartPreview";
import NavButton from "./components/NavButton";
import { motion, useAnimation } from "framer-motion";
import TuneIcon from "@mui/icons-material/Tune";
import useShowFilter from "./hooks/useShowFilter";
import ViewFilter from "./components/ViewFilter";

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
    const { showFilter, showFilterIcon, menuOpen, setMenuOpen, setShowFilter } =
        useShowFilter();

    const getTotalItems = useBoundStore((state) => state.getTotalItems());

    const filterBtnRef = useRef<HTMLButtonElement>(null);
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
        <>
            <ViewFilter
                open={showFilter}
                onClose={() => setShowFilter(false)}
            />
            <Menu
                open={menuOpen}
                variant="menu"
                anchorEl={filterBtnRef.current}
            >
                <NavButton to="/">Beers</NavButton>
                <NavButton to="/product-management">
                    Product Management
                </NavButton>
            </Menu>
            <ElevationScroll>
                <AppBar
                    component="nav"
                    position="sticky"
                    sx={{
                        top: 10,
                        mb: 2,
                        pr: 0,
                        boxSizing: "border-box",
                    }}
                    elevation={1}
                >
                    <Toolbar>
                        <IconButton
                            id="demo-positioned-button"
                            aria-controls={
                                menuOpen ? "main-nav-menu-mobile" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? "true" : undefined}
                            ref={filterBtnRef}
                            onClick={() => setMenuOpen((prev) => !prev)}
                            sx={{
                                display: { md: "none", sm: "inline-flex" },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {showFilterIcon && (
                            <IconButton
                                id="filter-btn-sm"
                                aria-controls={
                                    showFilter ? "filter-mobile" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={showFilter ? "true" : undefined}
                                onClick={() => setShowFilter((prev) => !prev)}
                                sx={{
                                    display: { md: "none", sm: "inline-flex" },
                                }}
                            >
                                <TuneIcon />
                            </IconButton>
                        )}
                        <Box
                            sx={{
                                display: {
                                    md: "block",
                                    sm: "none",
                                    xs: "none",
                                },
                            }}
                        >
                            <NavButton to="/">Beers</NavButton>
                            <NavButton to="/product-management">
                                Product Management
                            </NavButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <motion.div
                            animate={cartControls}
                            style={{
                                display: "flex",
                            }}
                        >
                            <IconButton
                                aria-label="cart-item"
                                aria-controls="cart-preview"
                                aria-expanded={
                                    showCartPreview ? "true" : undefined
                                }
                                onClick={() =>
                                    setShowCartPreview(!showCartPreview)
                                }
                                ref={cartRef}
                                sx={{
                                    borderRadius: 0,
                                }}
                            >
                                <Badge
                                    badgeContent={
                                        getTotalItems && (
                                            <motion.span
                                                animate={numberControls}
                                            >
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
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </>
    );
}
