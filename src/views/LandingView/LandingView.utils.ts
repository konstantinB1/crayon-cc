import { Beer } from "@/services/beer/api-beers";

export const placeholderBeers = new Array(10).fill(null).map(
    (_, i) =>
        ({
            placeholder: true,
            name: "",
            image: "",
            id: i,
            price: 0,
            rating: {
                average: 0,
                reviews: 0,
            },
        }) as Beer,
);
