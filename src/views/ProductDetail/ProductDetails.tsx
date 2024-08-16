import useGetImage from "@/hooks/useGetImage";
import { useBeerRootStore } from "@/store";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { beers, fetchedInitial, fetching } = useBeerRootStore(
        ({ fetching, fetchedInitial, beers }) => ({
            beers,
            fetchedInitial,
            fetching,
        }),
    );

    const currentBeer = useMemo(
        () => beers.find((beer) => beer.id === Number(id)),
        [beers, id],
    );

    const image = useGetImage(currentBeer?.image);

    return (
        <Grid container>
            <Grid item lg={3}></Grid>
            <Grid item lg={9}>
                <Card variant="outlined">
                    <Box
                        sx={{
                            height: "100%",
                        }}
                    >
                        <Box display="flex" gap={4} height="100%" p={2}>
                            <Box height="100%">
                                <Box
                                    sx={(theme) => ({
                                        border: "1px solid",
                                        borderColor: theme.palette.grey[900],
                                        height: 300,
                                        width: 300,
                                    })}
                                >
                                    <Box
                                        width="100%"
                                        height="100%"
                                        component="img"
                                        src={image}
                                    />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        wordBreak: "break-word",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {currentBeer?.description}
                                </Typography>
                                <Box height="auto">
                                    <Typography variant="h4" color="primary">
                                        {currentBeer?.priceFormated}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Divider sx={{ m: 0 }} />
                        <Box
                            p={4}
                            display="flex"
                            justifyContent="space-between"
                            sx={(theme) => ({
                                backgroundColor: theme.palette.grey[900],
                            })}
                        >
                            <Box>
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
                            <Button variant="outlined" startIcon={<AddIcon />}>
                                Add to cart
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
