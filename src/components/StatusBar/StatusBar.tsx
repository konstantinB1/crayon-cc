import useBoundStore from "@/store";
import {
    Card,
    Box,
    IconButton,
    useScrollTrigger,
    Badge,
    Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cloneElement, ReactElement, useRef, useState } from "react";
import MenuCartPreview from "./MenuCartPreview";
import usePersistCartBounds from "./hooks/usePersistCartBounds";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import NavButton from "./components/NavButton";

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
    const cartRef = useRef<HTMLButtonElement>(null);
    const [showCartPreview, setShowCartPreview] = useState(false);
    const { getTotalItems } = useBoundStore();
    const navigate = useNavigate();

    usePersistCartBounds(cartRef);

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
                <Box display="flex" mr={1}>
                    <IconButton
                        onClick={() => setShowCartPreview(!showCartPreview)}
                        ref={cartRef}
                        sx={{
                            borderRadius: 0,
                        }}
                    >
                        <Badge badgeContent={getTotalItems()} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
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
