import LandingViewFilters from "@/views/LandingView/components/LandingViewFilters";
import { Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type ViewFilterProps = {
    open: boolean;
    onClose?: () => void;
};

export default function ViewFilter({ open, onClose }: ViewFilterProps) {
    return (
        <Drawer anchor="bottom" open={open} onClose={onClose}>
            <Box position="absolute" right={10} top={10} onClick={onClose}>
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box p={10}>
                <LandingViewFilters onChange={onClose} />
            </Box>
        </Drawer>
    );
}
