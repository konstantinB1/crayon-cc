import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

export type AddButtonProps = {
    id: number;
    quantity: number;
    onAdd?: () => void;
};

export default function AddButton({ id, quantity, onAdd }: AddButtonProps) {
    const addToCart = useBoundStore((state) => state.add);
    const appStatus = useBoundStore((state) => state.appStatus);

    if (appStatus === AppStatus.offline || appStatus === AppStatus.apiError) {
        return null;
    }

    return (
        <IconButton
            aria-label="Add to cart"
            aria-expanded={quantity > 0}
            id={`add-btn-${id}`}
            color="primary"
            size="small"
            onClick={(e: { stopPropagation: () => void }) => {
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
