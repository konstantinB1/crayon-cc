import useGetImage from "@/hooks/useGetImage";
import { Beer } from "@/services/beer/api-beers";
import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";
import { Box, Typography } from "@mui/material";

export type ProductDetailImageProps = {
    currentBeer: Beer | null;
};

export default function ProductDetailImage({
    currentBeer,
}: ProductDetailImageProps) {
    const image = useGetImage(currentBeer?.image);
    const appStatus = useBoundStore((state) => state.appStatus);

    if (AppStatus.offline === appStatus) {
        return (
            <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography>Unable to load image</Typography>
            </Box>
        );
    }

    return (
        <Box
            width="100%"
            height="100%"
            component="img"
            alt={currentBeer?.name}
            src={image}
            sx={{
                objectFit: "contain",
            }}
        />
    );
}
