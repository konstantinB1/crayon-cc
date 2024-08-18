import { Box, CardMedia, Skeleton } from "@mui/material";
import { forwardRef, RefObject, useRef } from "react";
import useImageLoader from "./hooks/useImageLoader";

export type ImageRendererProps = {
    id: number;
    image: string;
};

const ImageRenderer = forwardRef<HTMLDivElement, ImageRendererProps>(
    ({ id, image }, ref: RefObject<HTMLDivElement>) => {
        const imgRef = useRef<HTMLImageElement | null>(null);
        const { exists, loading } = useImageLoader(ref, image);

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
                        ref={imgRef}
                        component="img"
                        image={exists ? image : process.env.PLACEHOLDER_IMG_URL}
                        sx={{
                            width: {
                                xl: 180,
                            },
                            height: {
                                xl: 180,
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
