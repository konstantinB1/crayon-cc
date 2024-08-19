import useBoundStore from "@/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { Badge, IconButton } from "@mui/material";

export type AddButtonProps = {
    id: number;
};

export default function RemoveButton({ id }: AddButtonProps) {
    const removeFromCart = useBoundStore((state) => state.remove);
    const count = useBoundStore((state) => state.getById(id));

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
                size="small"
                color="error"
                onClick={(e) => {
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
