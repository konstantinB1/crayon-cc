import { useBeerFilterStore, useBeerRootStore, useCartStore } from "@/store";
import { Card, Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function StatusBar() {
    const { beers } = useBeerRootStore(({ beers }) => ({
        beers,
    }));
    const { items } = useCartStore(({ items }) => ({ items }));
    const { viewBeers } = useBeerFilterStore(({ viewBeers }) => ({
        viewBeers,
    }));

    return (
        <Card
            sx={{
                position: "sticky",
                top: 10,
                zIndex: 10,
                mb: 2,
                display: "flex",
                alignItems: "center",
                width: "100%",
                py: 1,
                px: 2,
                boxSizing: "border-box",
            }}
            variant="outlined"
        >
            <Box flex={3}>
                <Typography variant="body2">
                    Showing&nbsp;
                    <Typography variant="caption" color="primary">
                        {viewBeers.length}
                    </Typography>
                    &nbsp;of&nbsp;
                    <Typography variant="caption">{beers.length}</Typography>
                </Typography>
            </Box>
            <Box display="flex">
                <Typography variant="body2" mr={1}>
                    ({items.length})
                </Typography>
                <ShoppingCartIcon fontSize="small" />
            </Box>
        </Card>
    );
}
