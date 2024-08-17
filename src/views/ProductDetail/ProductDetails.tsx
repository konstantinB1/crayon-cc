import useGetImage from "@/hooks/useGetImage";
import useBoundStore from "@/store";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsActions from "./components/ProductDetailsActions";
import IngredientsContainer from "./components/IngredientsContainer";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { beers } = useBoundStore();

    const currentBeer = useMemo(
        () => beers.find((beer) => beer.id === Number(id)),
        [beers, id],
    );

    const image = useGetImage(currentBeer?.image);

    return (
        <Grid container spacing={4}>
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
                                            xs: "auto",
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
                                    <Box
                                        width="100%"
                                        height="100%"
                                        component="img"
                                        src={image}
                                        sx={{
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid
                                sm={12}
                                lg={7}
                                item
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
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
                                    <Typography variant="h4" color="primary">
                                        {currentBeer?.priceFormated}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ m: 0 }} />
                        <Box
                            p={4}
                            display="flex"
                            justifyContent="space-between"
                            sx={(theme) => ({
                                backgroundColor: theme.palette.grey[900],
                            })}
                        >
                            <Box maxWidth={400}>
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
