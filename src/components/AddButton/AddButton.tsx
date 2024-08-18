import useBoundStore from "@/store";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

export type AddButtonProps = {
    id: number;
    quantity: number;
    onAdd?: () => void;
};

export default function AddButton({ id, quantity, onAdd }: AddButtonProps) {
    const addToCart = useBoundStore((state) => state.add);

    return (
        <IconButton
            color="primary"
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                onAdd?.();
                addToCart(id, quantity);
            }}
            sx={{
                borderRadius: 1,
                border: "1px solid",
                borderColor: "primary.main",
            }}
        >
            <AddIcon fontSize="small" />
        </IconButton>
    );
}
