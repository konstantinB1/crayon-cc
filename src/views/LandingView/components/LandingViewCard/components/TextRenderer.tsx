import { useCartStore } from "@/store";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import TextOverflow from "./TextOverflow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo, useTransition } from "react";
import { Beer } from "@/services/beer/api-beers";
import { formatPrice } from "@/utils/price-utils";

export type TextRendererProps = Pick<Beer, "name" | "price" | "id">;

export default function TextRenderer({ id, name, price }: TextRendererProps) {
    const {
        remove: removeFromCart,
        add: addToCart,
        items,
    } = useCartStore(({ add, remove, items }) => ({
        add,
        remove,
        items,
    }));

    const getItemsForProduct = useMemo(
        () => items.filter((item) => item === id).length,
        [id, items],
    );

    const [isPending, startTransition] = useTransition();

    return (
        <Box width="100%" height="100%">
            <Box height={160}>
                <TextOverflow text={name} />
                <Divider sx={{ mt: 2 }} />
                <Box
                    display="flex"
                    alignItems="center"
                    height={70}
                    justifyContent="space-between"
                    sx={(theme) => ({
                        bgcolor: theme.palette.grey[900],
                    })}
                    px={2}
                >
                    <Typography variant="h5" color="primary" fontWeight={500}>
                        {formatPrice(price)}
                    </Typography>
                    <Box display="flex">
                        {getItemsForProduct ? (
                            <Button
                                size="small"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromCart(id);
                                }}
                            >
                                Remove ({getItemsForProduct})
                            </Button>
                        ) : null}
                        <IconButton
                            size="medium"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                startTransition(() => {
                                    if (!isPending) {
                                        addToCart(id);
                                    }
                                });
                            }}
                        >
                            <AddCircleIcon fontSize="medium" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
