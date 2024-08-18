import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import LandingViewCard from "./components/LandingViewCard";
import LandingViewFilters from "./components/LandingViewFilters";
import useLandingViewData from "./hooks/useLandingViewData";

export default function LandingView() {
    const { beers, rootRef, fetchedInitial } = useLandingViewData();

    return (
        <Stack>
            <Grid container spacing={4} columns={20}>
                <Grid
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    sm={20}
                    xs={20}
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
                <Grid item xl={14} md={14} lg={14}>
                    <Grid container spacing={4} ref={rootRef}>
                        {fetchedInitial && beers.length === 0 && (
                            <Grid
                                data-testid="no-data"
                                item
                                md={12}
                                lg={12}
                                sm={12}
                            >
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
                                data-testid={`beer-card-${beer.id}`}
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
