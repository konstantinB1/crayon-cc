import { Box, CardMedia, Skeleton } from "@mui/material";
import useImageLoader from "./hooks/useImageLoader";
import { RefObject } from "react";

export type ImageRendererProps = {
    rootRef: RefObject<HTMLDivElement | null>;
    image: string;
};

export default function ImageRenderer({ rootRef, image }: ImageRendererProps) {
    const { exists, loading } = useImageLoader(rootRef, image);

    return (
        <Box
            width={160}
            height={160}
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="auto"
            mt={4}
        >
            {loading && (
                <Skeleton
                    width="inherit"
                    height="inherit"
                    variant="rectangular"
                    animation="wave"
                    sx={(theme) => ({
                        bgcolor: theme.palette.background.paper,
                    })}
                />
            )}
            {!loading && (
                <CardMedia
                    component="img"
                    image={exists ? image : process.env.PLACEHOLDER_IMG_URL}
                    width="100%"
                    height="100%"
                    sx={{
                        objectFit: "contain",
                    }}
                />
            )}
        </Box>
    );
}
