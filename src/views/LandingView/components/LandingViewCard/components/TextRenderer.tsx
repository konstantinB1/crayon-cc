import { Box, Divider, Typography } from "@mui/material";
import TextOverflow from "./TextOverflow";
import { Beer } from "@/services/beer/api-beers";
import { formatPrice } from "@/utils/price-utils";
import AddButton from "@/components/AddButton";
import RemoveButton from "@/components/RemoveButton";

export type TextRendererProps = Pick<Beer, "name" | "price" | "id">;

export default function TextRenderer({ id, name, price }: TextRendererProps) {
    return (
        <Box width="100%" height="100%">
            <Box>
                <TextOverflow text={name} />
                <Divider sx={{ mt: 2 }} />
                <Box
                    display="flex"
                    alignItems="center"
                    height={70}
                    justifyContent="space-between"
                    sx={(theme) => ({
                        bgcolor: theme.palette.grey[900],
                    })}
                    px={2}
                >
                    <Typography variant="h5" color="primary" fontWeight={500}>
                        {formatPrice(price)}
                    </Typography>
                    <Box display="flex" gap={1}>
                        <RemoveButton id={id} />
                        <AddButton id={id} quantity={1} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
