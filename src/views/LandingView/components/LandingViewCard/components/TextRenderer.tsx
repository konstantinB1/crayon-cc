import { Beer } from "@/api/beers";
import { useBearStore } from "@/store";
import {
    Box,
    CardContent,
    IconButton,
    Skeleton,
    Tooltip,
    Typography,
} from "@mui/material";
import TextOverflow from "./TextOverflow";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export type TextRendererProps = Pick<Beer, "name" | "price">;

export default function TextRenderer({ name, price }: TextRendererProps) {
    const { fetching, fetchedInitial } = useBearStore(
        ({ fetching, fetchedInitial }) => ({
            fetching,
            fetchedInitial,
        }),
    );

    return (
        <CardContent>
            {fetching && (
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={(theme) => ({
                        bgcolor: theme.palette.background.paper,
                        height: 50,
                        width: 150,
                    })}
                />
            )}
            {!fetching && fetchedInitial && (
                <Box width={250} overflow="hidden">
                    <TextOverflow text={name} />
                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Typography
                            variant="h6"
                            color="primary"
                            fontWeight={500}
                        >
                            {price}
                        </Typography>
                        <Tooltip title="Add to cart">
                            <IconButton size="small" color="primary">
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            )}
        </CardContent>
    );
}
