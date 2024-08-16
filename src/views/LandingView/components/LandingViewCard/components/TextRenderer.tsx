import { useBeerRootStore, useCartStore } from "@/store";
import {
    Box,
    CardContent,
    IconButton,
    Skeleton,
    Typography,
} from "@mui/material";
import TextOverflow from "./TextOverflow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTransition } from "react";
import { Beer } from "@/services/beer/api-beers";
import { formatPrice } from "@/utils/price-utils";

export type TextRendererProps = Pick<Beer, "name" | "price" | "id">;

export default function TextRenderer({ id, name, price }: TextRendererProps) {
    const { add: addToCart } = useCartStore(({ add, items }) => ({
        add,
        items,
    }));
    const { fetching, fetchedInitial } = useBeerRootStore(
        ({ fetching, fetchedInitial }) => ({
            fetching,
            fetchedInitial,
        }),
    );
    const [isPending, startTransition] = useTransition();

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
                            {formatPrice(price)}
                        </Typography>
                        <Box display="flex">
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                    startTransition(() => {
                                        if (!isPending) {
                                            addToCart(id);
                                        }
                                    });
                                }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            )}
        </CardContent>
    );
}
