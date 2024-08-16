import useGetImage from "@/hooks/useGetImage";
import { useBeerRootStore } from "@/store";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

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
            <Grid item lg={4}></Grid>
            <Grid item lg={8}>
                <Card variant="outlined">
                    <CardContent>
                        <Box
                            p={4}
                            mb={2}
                            sx={(theme) => ({
                                border: "1px solid",
                                borderColor: theme.palette.grey[800],
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
                        <Typography variant="h4">
                            {currentBeer?.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
