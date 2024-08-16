import { Box, CardMedia, Skeleton } from "@mui/material";
import { forwardRef, RefObject } from "react";
import useImageLoader from "./hooks/useImageLoader";

export type ImageRendererProps = {
    image: string;
};

const ImageRenderer = forwardRef<HTMLDivElement, ImageRendererProps>(
    ({ image }, ref: RefObject<HTMLDivElement>) => {
        const { exists, loading } = useImageLoader(ref, image);

        return (
            <Box
                width={180}
                height={180}
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="auto"
                my={4}
            >
                {loading && (
                    <Skeleton
                        width={180}
                        height={180}
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
    },
);

export default ImageRenderer;
