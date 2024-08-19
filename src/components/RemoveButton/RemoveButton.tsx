import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";
import DeleteIcon from "@mui/icons-material/Delete";
import { Badge, IconButton } from "@mui/material";

export type AddButtonProps = {
    id: number;
};

export default function RemoveButton({ id }: AddButtonProps) {
    const removeFromCart = useBoundStore((state) => state.remove);
    const count = useBoundStore((state) => state.getById(id));
    const appStatus = useBoundStore((state) => state.appStatus);

    if (appStatus === AppStatus.offline || AppStatus.apiError) {
        return null;
    }

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
