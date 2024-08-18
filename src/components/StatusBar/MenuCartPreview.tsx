import useBoundStore from "@/store";
import {
    Backdrop,
    Box,
    Card,
    Divider,
    Grid,
    Popper,
    Typography,
} from "@mui/material";
import { forwardRef, RefObject } from "react";
import MenuCartTable from "./MenuCartTable";
import ButtonCheckout from "./components/ButtonCheckout";

const MenuCartPreview = forwardRef<
    HTMLButtonElement,
    { open: boolean; onClose: () => void }
>(({ open, onClose }, ref: RefObject<HTMLButtonElement>) => {
    const getCartItems = useBoundStore((state) => state.getCartItems);
    const getTotalPrice = useBoundStore((state) => state.getTotalPrice);

    const cartItems = getCartItems();
    const hasItems = cartItems.length > 0;

    return (
        <>
            <Backdrop invisible open={open} onClick={() => onClose()} />
            <Popper
                modifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 10],
                        },
                    },
                ]}
                placement="bottom-end"
                sx={{
                    zIndex: 100,
                }}
                anchorEl={ref.current}
                open={open}
            >
                <Card
                    variant="elevation"
                    elevation={10}
                    sx={{
                        width: {
                            xl: 500,
                            lg: 500,
                            md: 500,
                            sm: 500,
                            xs: 300,
                        },
                    }}
                >
                    <Box>
                        {!hasItems && (
                            <Box
                                p={2}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography variant="body1">
                                    No items in cart
                                </Typography>
                            </Box>
                        )}
                        {hasItems && (
                            <Box p={1}>
                                <MenuCartTable items={cartItems} />
                            </Box>
                        )}
                    </Box>
                    {hasItems && (
                        <>
                            <Divider
                                sx={{
                                    display: {
                                        lg: "block",
                                        md: "block",
                                        sm: "block",
                                        xs: "none",
                                    },
                                }}
                            />
                            <Grid container p={3}>
                                <Grid item lg={9} md={8} xs={12} sm={6}>
                                    <Typography
                                        lineHeight={0.5}
                                        variant="caption"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        Total
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="success.main"
                                    >
                                        {getTotalPrice()}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    xs={12}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <ButtonCheckout />
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Card>
            </Popper>
        </>
    );
});

export default MenuCartPreview;
