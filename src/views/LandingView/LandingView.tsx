import { Card, CardContent, Grid } from "@mui/material";
import { useBearStore } from "../../store";
import CardMediaWithFallback from "./components/CardContentData";

import { useRef } from "react";

export default function LandingView() {
    const { beers } = useBearStore(({ beers }) => ({ beers }));
    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <Grid container spacing={4}>
            <Grid item md={3} lg={3} position="sticky" top={0}>
                <Card variant="outlined">
                    <CardContent>Filters</CardContent>
                </Card>
            </Grid>
            <Grid item md={9} lg={9}>
                <Grid container spacing={4} ref={rootRef}>
                    {beers.map((beer) => (
                        <Grid item md={4} lg={4} key={beer.id}>
                            <Card variant="outlined">
                                <CardMediaWithFallback data={beer} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
