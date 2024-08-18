import { Box, TextField, IconButton, Badge } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useBoundStore from "@/store";

export default function ProductDetailsActions({ id = 0 }: { id: number }) {
    const [quantity, setQuantity] = useState(1);
    const { add: addToCart, getById, remove: removeFromCart } = useBoundStore();

    const count = getById(id);

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <TextField
                type="number"
                size="small"
                onChange={(e) => setQuantity(Number(e.target.value))}
                label="Quantity"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    max: 99,
                    min: 1,
                }}
                InputProps={{
                    sx: {
                        height: 33,
                    },
                }}
                sx={{
                    width: {
                        xl: 70,
                        lg: 70,
                        md: 70,
                        sm: 100,
                        xs: 100,
                    },
                    p: 0.1,
                }}
                value={quantity}
            />

            <IconButton
                color="primary"
                size="small"
                onClick={() => addToCart(id, quantity)}
                sx={{
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "primary.main",
                }}
            >
                <AddIcon fontSize="small" />
            </IconButton>
            <Badge
                overlap="rectangular"
                badgeContent={count}
                color="error"
                sx={{
                    visibility: count > 0 ? "visible" : "hidden",
                }}
            >
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeFromCart(id)}
                    sx={{
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "error.main",
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Badge>
        </Box>
    );
}
