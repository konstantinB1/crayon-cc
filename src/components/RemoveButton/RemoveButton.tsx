import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";
import DeleteIcon from "@mui/icons-material/Delete";
import { Badge, IconButton } from "@mui/material";
import { useMemo } from "react";

export type AddButtonProps = {
    id: number;
};

export default function RemoveButton({ id }: AddButtonProps) {
    const removeFromCart = useBoundStore((state) => state.remove);
    const fetched = useBoundStore((state) => state.fetchedInitial);
    const count = useBoundStore((state) => state.getById(id));
    const appStatus = useBoundStore((state) => state.appStatus);

    const disabled = useMemo(
        () =>
            !fetched ||
            appStatus === AppStatus.offline ||
            appStatus === AppStatus.apiError,
        [appStatus, fetched],
    );

    return (
        <Badge
            overlap="rectangular"
            badgeContent={count}
            color="error"
            sx={{
                visibility: count > 0 ? "visible" : "hidden",
            }}
        >
            <IconButton
                disabled={disabled}
                aria-label="Remove from cart"
                aria-expanded={count > 0}
                id={`remove-btn-${id}`}
                size="small"
                color="error"
                // Not really sure why, for some reason the type of e is not inferred
                // correctly here, so I had to manually specify it.
                onClick={(e: { stopPropagation: () => void }) => {
                    e.stopPropagation();
                    removeFromCart(id);
                }}
                sx={{
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "error.main",
                }}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Badge>
    );
}
