import { Box, Card, CardContent, CardHeader, Stack } from "@mui/material";
import useMetrics from "./hooks/useMetrics";
import { LineChart, PieChart } from "@mui/x-charts";
import {
    blue,
    cyan,
    green,
    indigo,
    orange,
    purple,
    red,
    pink,
    lime,
    amber,
} from "@mui/material/colors";

const randomColors = [
    red[300],
    blue[300],
    cyan[300],
    lime[300],
    green[300],
    orange[300],
    purple[300],
    pink[300],
    indigo[300],
    amber[300],
];

const createColors = () => {
    let index = 0;

    return () => {
        try {
            return randomColors[index++];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            index = 0;
            return randomColors[index++];
        }
    };
};

export default function ProductManagement() {
    const { getAllAvgByBrewery, getByMostReviews } = useMetrics();

    const getColor = createColors();

    return (
        <Stack display="flex" flexDirection="column" gap={2}>
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
            <Card variant="outlined">
                <CardHeader title="Highest average rating by brewery" />
                <CardContent>
                    {/* <LineChart
                        dataset={}
                    /> */}
                </CardContent>
            </Card>
        </Stack>
    );
}
