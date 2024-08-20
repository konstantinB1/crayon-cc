import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { useMemo } from "react";

export type AddButtonProps = {
    id: number;
    quantity: number;
    onAdd?: () => void;
};

export default function AddButton({ id, quantity, onAdd }: AddButtonProps) {
    const addToCart = useBoundStore((state) => state.add);
    const appStatus = useBoundStore((state) => state.appStatus);
    const fetched = useBoundStore((state) => state.fetchedInitial);

    const disabled = useMemo(
        () =>
            !fetched ||
            appStatus === AppStatus.offline ||
            appStatus === AppStatus.apiError,
        [appStatus, fetched],
    );

    return (
        <IconButton
            aria-label="Add to cart"
            aria-expanded={quantity > 0}
            id={`add-btn-${id}`}
            color="primary"
            disabled={disabled}
            size="small"
            // Not really sure why, for some reason the type of e is not inferred
            // correctly here, so I had to manually specify it.
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
