import { useCartStore } from "@/store";
import { Box, IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function CardStatus({ id }: { id: number }) {
    const { items } = useCartStore(({ items }) => ({ items }));
    const added = items.some((item) => item === id);

    return (
        <Box width="100%">
            <Box height={50}>
                {added && (
                    <IconButton
                        size="small"
                        color="primary"
                        disabled
                        aria-label="added to cart"
                    >
                        <RemoveCircleIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}
