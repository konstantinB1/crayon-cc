import { Card, CardContent, Grid } from "@mui/material";
import { useBearStore } from "@/store";
import LandingViewCard from "./components/LandingViewCard";

import { useRef } from "react";
import LandingViewFilters from "./components/LandingViewFilters";

export default function LandingView() {
    const { beers } = useBearStore(({ beers }) => ({ beers }));
    const rootRef = useRef<HTMLDivElement | null>(null);

    console.log(beers);

    return (
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
    );
}
