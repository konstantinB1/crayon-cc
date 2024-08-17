import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ButtonCheckout() {
    return (
        <Button
            fullWidth
            sx={(theme) => ({
                px: 8,
                "&:hover": {
                    svg: {
                        transition: theme.transitions.create("all", {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        transform: "translateX(3px)",
                    },
                },
            })}
            startIcon={<ArrowForwardIcon />}
            size="small"
            variant="contained"
        >
            Checkout
        </Button>
    );
}
