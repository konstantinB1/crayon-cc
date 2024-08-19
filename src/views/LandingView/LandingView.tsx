import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import LandingViewCard from "./components/LandingViewCard";
import LandingViewFilters from "./components/LandingViewFilters";
import useLandingViewData from "./hooks/useLandingViewData";
import LandingViewSearch from "./components/LandingViewSearch";

export default function LandingView() {
    const { beers, rootRef, fetchedInitial } = useLandingViewData();

    return (
        <Grid container spacing={4} columns={20}>
            <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={20}
                xs={20}
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
                    <CardContent sx={{ mt: 2 }}>
                        <LandingViewFilters />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xl={14} md={14} lg={14}>
                <Box>
                    <LandingViewSearch />
                </Box>
                <Grid container spacing={4} ref={rootRef}>
                    {fetchedInitial && beers.length === 0 && (
                        <Grid
                            data-testid="no-data"
                            item
                            md={12}
                            lg={12}
                            sm={12}
                        >
                            <Typography variant="h5">No beers found</Typography>
                        </Grid>
                    )}
                    {beers.map((beer) => (
                        <Grid
                            sx={(theme) => ({
                                cursor: "pointer",
                                transition: theme.transitions.create("all", {
                                    duration: theme.transitions.duration.short,
                                }),
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
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
