import { Box } from "@mui/material";
import { useRef } from "react";

import ImageRenderer from "./components/ImageRenderer";
import TextRenderer from "./components/TextRenderer";
import CardStatus from "./components/CardStatus";
import { Beer } from "@/services/beer/api-beers";

type LandingViewCardProps = {
    data: Beer;
};

export default function LandingViewCard({ data }: LandingViewCardProps) {
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
            <CardStatus id={data.id} />
            <ImageRenderer ref={rootRef} image={data.image} />
            <TextRenderer id={data.id} name={data.name} price={data.price} />
        </Box>
    );
}
