import { Box, Card } from "@mui/material";
import { CSSProperties, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ImageRenderer from "./components/ImageRenderer";
import TextRenderer from "./components/TextRenderer";
import { Beer } from "@/services/beer/api-beers";

type LandingViewCardProps = {
    data: Beer;
    style: CSSProperties;
};

export default function LandingViewCard({ data, style }: LandingViewCardProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                ...style,
                left: style.left as number,
                right: style.right as number,
                top: style.top as number,
                bottom: style.bottom as number,
                width: (style.width as number) - 34,
                height: {
                    xl: 395,
                    lg: 395,
                    md: 395,
                    sm: "auto",
                },
                "&:hover": {
                    borderColor: (theme) => theme.palette.grey[800],
                },
            }}
            variant="outlined"
            onClick={() => {
                navigate(`/beer/${data.id}`);
            }}
        >
            <Box ref={rootRef} data-id={data.id}>
                <ImageRenderer ref={rootRef} image={data.image} />
                <TextRenderer
                    id={data.id}
                    name={data.name}
                    price={data.price}
                />
            </Box>
        </Card>
    );
}
