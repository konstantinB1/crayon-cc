import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useBeerFilterStore, useBeerRootStore } from "@/store";
import LandingViewCard from "./components/LandingViewCard";

import { useRef } from "react";
import LandingViewFilters from "./components/LandingViewFilters";
import StatusBar from "./components/StatusBar/StatusBar";
import { placeholderBeers } from "./LandingView.utils";

export default function LandingView() {
    const { fetchedInitial, fetching } = useBeerRootStore(
        ({ fetching, fetchedInitial }) => ({
            fetchedInitial,
            fetching,
        }),
    );

    const { viewBeers } = useBeerFilterStore(({ viewBeers }) => ({
        viewBeers,
    }));

    const rootRef = useRef<HTMLDivElement | null>(null);
    const beers = fetchedInitial ? viewBeers : placeholderBeers;

    return (
        <Stack>
            <StatusBar />
            <Grid container spacing={4}>
                <Grid item md={3} lg={3} position="sticky" top={0}>
                    <Card variant="outlined">
                        <CardContent>
                            <LandingViewFilters />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={9} lg={9}>
                    <Grid container spacing={4} ref={rootRef}>
                        {fetchedInitial && beers.length === 0 && (
                            <Grid item md={12} lg={12} sm={12}>
                                <Typography variant="h5">
                                    No beers found
                                </Typography>
                            </Grid>
                        )}
                        {beers.map((beer) => (
                            <Grid
                                item
                                md={4}
                                lg={4}
                                key={beer.id}
                                data-testid={`beer-${beer.id}`}
                            >
                                <Card variant="outlined">
                                    <LandingViewCard data={beer} />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
}
