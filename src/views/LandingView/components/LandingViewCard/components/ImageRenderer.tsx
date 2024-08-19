import { Box, CardMedia, Skeleton } from "@mui/material";
import { forwardRef, RefObject, useRef } from "react";
import useImageLoader from "./hooks/useImageLoader";

export type ImageRendererProps = {
    image: string;
    name: string;
};

const ImageRenderer = forwardRef<HTMLDivElement, ImageRendererProps>(
    ({ image, name }, ref: RefObject<HTMLDivElement>) => {
        const imgRef = useRef<HTMLImageElement | null>(null);
        const { exists, loading } = useImageLoader(ref, image);
        const img = exists ? image : process.env.PLACEHOLDER_IMG_URL;

        return (
            <Box
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="auto"
                my={4}
                sx={{
                    width: {
                        lg: 180,
                    },
                    height: {
                        lg: 180,
                    },
                }}
            >
                {loading && (
                    <Skeleton
                        data-testid="image-skeleton"
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
                        data-testid="image"
                        ref={imgRef}
                        component="img"
                        alt={name}
                        image={img}
                        sx={{
                            mb: {
                                xl: 0,
                                lg: 0,
                                md: 0,
                                sm: 0,
                                xs: 4,
                            },
                            width: {
                                xl: 180,
                                lg: 180,
                                md: 180,
                                sm: 220,
                                xs: "50%",
                            },
                            height: {
                                xl: 180,
                                lg: 180,
                                md: 180,
                                sm: 220,
                                xs: "50%",
                            },
                            objectFit: "contain",
                        }}
                    />
                )}
            </Box>
        );
    },
);

export default ImageRenderer;
