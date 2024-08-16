import { useBeerFilterStore, useBeerRootStore, useCartStore } from "@/store";
import {
    Card,
    Box,
    Typography,
    IconButton,
    useScrollTrigger,
    Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cloneElement, ReactElement } from "react";

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
    const { beers } = useBeerRootStore(({ beers }) => ({
        beers,
    }));
    const { items } = useCartStore(({ items }) => ({ items }));
    const { viewBeers } = useBeerFilterStore(({ viewBeers }) => ({
        viewBeers,
    }));

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
                <Box flex={3}>
                    <Typography variant="body2">
                        Showing&nbsp;
                        <Typography variant="caption" color="primary">
                            {viewBeers.length}
                        </Typography>
                        &nbsp;of&nbsp;
                        <Typography variant="caption">
                            {beers.length}
                        </Typography>
                    </Typography>
                </Box>
                <Box display="flex" mr={1}>
                    <IconButton
                        sx={{
                            borderRadius: 0,
                        }}
                    >
                        <Badge badgeContent={items.length} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Card>
        </ElevationScroll>
    );
}
