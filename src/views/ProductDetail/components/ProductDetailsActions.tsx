import { Box, TextField } from "@mui/material";
import { useState } from "react";
import RemoveButton from "@/components/RemoveButton";
import AddButton from "@/components/AddButton";

export default function ProductDetailsActions({ id = 0 }: { id: number }) {
    const [quantity, setQuantity] = useState(1);

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

            <AddButton id={id} quantity={quantity} />
            <RemoveButton id={id} />
        </Box>
    );
}
