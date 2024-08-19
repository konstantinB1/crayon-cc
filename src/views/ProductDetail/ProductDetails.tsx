import useGetImage from "@/hooks/useGetImage";
import useBoundStore from "@/store";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsActions from "./components/ProductDetailsActions";
import IngredientsContainer from "./components/IngredientsContainer";
import { AppStatus } from "@/store/root";
import ProductDetailImage from "./components/ProductDetailImage";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { beers } = useBoundStore();

    const currentBeer = useMemo(
        () => beers.find((beer) => beer.id === Number(id)),
        [beers, id],
    );

    const image = useGetImage(currentBeer?.image);
    const appStatus = useBoundStore((state) => state.appStatus);

    return (
        <Grid
            container
            spacing={4}
            display="flex"
            sx={{
                flexDirection: {
                    lg: "row",
                    md: "column-reverse",
                    sm: "column-reverse",
                    xs: "column-reverse",
                },
            }}
        >
            <Grid item lg={3} sm={12} xs={12}>
                <IngredientsContainer ingredients={currentBeer?.ingredients} />
            </Grid>
            <Grid item lg={9} sm={12} xs={12}>
                <Card variant="outlined">
                    <Box
                        sx={{
                            height: "100%",
                        }}
                    >
                        <Grid container p={2} spacing={2}>
                            <Grid item lg={5} sm={12} xs={12} height="100%">
                                <Box
                                    sx={(theme) => ({
                                        border: "1px solid",
                                        borderColor: theme.palette.grey[900],
                                        width: {
                                            xl: 300,
                                            lg: 300,
                                            md: 300,
                                            sm: 300,
                                            xs: "50%",
                                        },
                                        height: {
                                            xl: 300,
                                            lg: 300,
                                            md: 300,
                                            sm: 300,
                                            xs: "auto",
                                        },
                                        margin: "auto",
                                        p: 2,
                                    })}
                                >
                                    <ProductDetailImage
                                        currentBeer={currentBeer}
                                    />
                                </Box>
                            </Grid>
                            <Grid
                                sm={12}
                                lg={7}
                                item
                                display="flex"
                                justifyContent="space-between"
                                sx={{
                                    flexDirection: {
                                        lg: "column",
                                        md: "column-reverse",
                                        sm: "column-reverse",
                                        xs: "column-reverse",
                                    },
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        wordSpacing: 0.5,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {currentBeer?.description}
                                </Typography>
                                <Box height="auto">
                                    <Typography
                                        variant="h4"
                                        color="primary"
                                        sx={{
                                            mb: {
                                                xl: 0,
                                                lg: 0,
                                                md: 1,
                                                sm: 1,
                                                xs: 1,
                                            },
                                        }}
                                    >
                                        {currentBeer?.priceFormated}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box
                            p={4}
                            justifyContent="space-between"
                            sx={(theme) => ({
                                display: {
                                    xl: "flex",
                                    lg: "flex",
                                    md: "flex",
                                    sm: "flex",
                                    xs: "block",
                                },
                                p: {
                                    xl: 4,
                                    lg: 4,
                                    md: 4,
                                    sm: 4,
                                    xs: 2,
                                },
                                backgroundColor: theme.palette.grey[900],
                            })}
                        >
                            <Box
                                maxWidth={400}
                                sx={{
                                    mb: {
                                        xl: 0,
                                        lg: 0,
                                        md: 0,
                                        sm: 0,
                                        xs: 4,
                                    },
                                }}
                            >
                                <Typography variant="h5">
                                    {currentBeer?.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    {currentBeer?.brewery}
                                </Typography>
                            </Box>
                            <ProductDetailsActions id={currentBeer?.id} />
                        </Box>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
