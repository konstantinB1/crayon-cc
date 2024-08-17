import useBoundStore from "@/store";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

export type AddButtonProps = {
    id: number;
    quantity: number;
    onAdd?: () => void;
};

export default function AddButton({ id, quantity, onAdd }: AddButtonProps) {
    const { add: addToCart } = useBoundStore();

    return (
        <IconButton
            color="primary"
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                addToCart(id, quantity);
                onAdd?.();
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
