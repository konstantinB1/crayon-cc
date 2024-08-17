import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import useBoundStore from "@/store";
import LandingViewCard from "./components/LandingViewCard";

import { useRef } from "react";
import LandingViewFilters from "./components/LandingViewFilters";
import { placeholderBeers } from "./LandingView.utils";

export default function LandingView() {
    const { fetchedInitial, viewBeers } = useBoundStore();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const beers = fetchedInitial ? viewBeers : placeholderBeers;

    return (
        <Stack>
            <Grid container spacing={4}>
                <Grid
                    item
                    md={3}
                    lg={3}
                    sm={12}
                    xs={12}
                    xl={3}
                    position="sticky"
                    zIndex={1000}
                    sx={{
                        top: {
                            lg: 10,
                            md: 10,
                            sm: 40,
                        },
                    }}
                >
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
                                sx={(theme) => ({
                                    transition: theme.transitions.create(
                                        "transform",
                                        {
                                            duration:
                                                theme.transitions.duration
                                                    .shortest,
                                        },
                                    ),
                                    "&:hover": {
                                        transform: "scale(1.01)",
                                    },
                                })}
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                key={beer.id}
                                data-testid={`beer-${beer.id}`}
                            >
                                <LandingViewCard data={beer} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
}
