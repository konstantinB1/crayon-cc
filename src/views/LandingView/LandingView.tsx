import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import LandingViewFilters from "./components/LandingViewFilters";
import useLandingViewData from "./hooks/useLandingViewData";
import LandingViewSearch from "./components/LandingViewSearch";
import { useRef } from "react";
import LandingViewVirtual from "./components/LandingViewVirtual/LandingViewVirtual";

export default function LandingView() {
    const { beers, rootRef, fetchedInitial } = useLandingViewData();
    const gridRef = useRef<HTMLDivElement>(null);

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
                        display: { md: "block", sm: "none", xs: "none" },
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
                <Grid item xl={14} md={14} lg={14} ref={rootRef}>
                    <Box>
                        <LandingViewSearch />
                    </Box>
                    <Grid container spacing={4} ref={gridRef}>
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
                        <LandingViewVirtual ref={gridRef} beers={beers} />
                        {/* {beers.map((beer) => (
                            <Grid
                                sx={(theme) => ({
                                    cursor: "pointer",
                                    transition: theme.transitions.create(
                                        "all",
                                        {
                                            duration:
                                                theme.transitions.duration
                                                    .short,
                                        },
                                    ),
                                    "&:hover": {
                                        transform: "scale(1.02)",
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
                        ))} */}
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
}
