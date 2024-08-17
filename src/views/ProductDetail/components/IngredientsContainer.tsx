import { Beer } from "@/services/beer/api-beers";
import { Card, Box, Typography, Grid } from "@mui/material";

export type IngredientsContainerProps = {
    ingredients: Beer["ingredients"];
};

export default function IngredientsContainer({
    ingredients,
}: IngredientsContainerProps) {
    return (
        <Card variant="outlined">
            <Box p={2}>
                <Typography variant="h5" mb={2}>
                    Ingredients
                </Typography>
                <Grid container spacing={2}>
                    {ingredients?.map(([name, amount]) => (
                        <Grid item lg={6} md={6} sm={6} xs={12} key={name}>
                            <Card
                                variant="outlined"
                                sx={{ p: 1, textAlign: "center" }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {name}
                                </Typography>
                                <Typography variant="body2">
                                    {amount}%
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Card>
    );
}
