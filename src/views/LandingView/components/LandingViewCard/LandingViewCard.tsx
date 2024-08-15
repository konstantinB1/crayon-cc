import { Box } from "@mui/material";
import { useRef } from "react";
import { type Beer } from "@/api/beers";
import ImageRenderer from "./components/ImageRenderer";
import TextRenderer from "./components/TextRenderer";

type LandingViewCardProps = {
    data: Beer;
};

export default function LandingViewCard({ data }: LandingViewCardProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    console.log(rootRef);

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
