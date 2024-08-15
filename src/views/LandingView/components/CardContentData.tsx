import { Box } from "@mui/material";
import { useRef } from "react";
import { type Beer } from "@/api/beers";

import ImageRenderer from "./ImageRenderer";
import TextRenderer from "./TextRenderer";

type CardContentDataProps = {
    data: Beer;
};

export default function CardContentData({ data }: CardContentDataProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <Box
            ref={rootRef}
            data-id={data.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <ImageRenderer rootRef={rootRef} image={data.image} />
            <TextRenderer name={data.name} price={data.price} />
        </Box>
    );
}
