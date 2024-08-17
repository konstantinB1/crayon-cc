import { Box, Card, CardActionArea } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import ImageRenderer from "./components/ImageRenderer";
import TextRenderer from "./components/TextRenderer";
import { Beer } from "@/services/beer/api-beers";

type LandingViewCardProps = {
    data: Beer;
};

export default function LandingViewCard({ data }: LandingViewCardProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    return (
        <Card
            variant="outlined"
            onClick={() => {
                navigate(`/beer/${data.id}`);
            }}
        >
            <CardActionArea disableRipple>
                <Box
                    ref={rootRef}
                    data-id={data.id}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <ImageRenderer
                        id={data.id}
                        ref={rootRef}
                        image={data.image}
                    />
                    <TextRenderer
                        id={data.id}
                        name={data.name}
                        price={data.price}
                    />
                </Box>
            </CardActionArea>
        </Card>
    );
}
