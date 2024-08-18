import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import useMetrics from "../hooks/useMetrics";
import { PieChart } from "@mui/x-charts";
import { createColors } from "./Graphs.utils";
import StatsTable from ".//StatsTable";

export default function Graphs() {
    const { getAllAvgByBrewery, getByMostReviews } = useMetrics();

    const getColor = createColors();

    return (
        <Stack display="flex" flexDirection="column" gap={2}>
            <StatsTable />
            <Card variant="outlined">
                <CardHeader title="Most popular breweries by rating" />
                <CardContent>
                    <PieChart
                        height={500}
                        series={[
                            {
                                arcLabel: (item) =>
                                    `${item.label} (${item.value})`,
                                arcLabelMinAngle: 45,
                                data: getByMostReviews.map((item) => ({
                                    color: getColor(),
                                    value: item.sum,
                                    label: item.brewery,
                                })),
                            },
                        ]}
                    />
                </CardContent>
            </Card>
        </Stack>
    );
}
