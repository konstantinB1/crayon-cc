import { priceToInt } from "@/utils/order-utils";
import { formatPrice } from "@/utils/price-utils";

export type Beer = {
    placeholder: boolean;
    price?: string | number;
    name?: string;
    image?: string;
    ingredients?: string[];
    priceFormated?: string;
    brewery?: string;
    description?: string;
    id?: number;
    rating?: {
        average: number;
        reviews: number;
    };
};

const fakeIngredients = [
    "Water",
    "Malt",
    "Hops",
    "Yeast",
    "Love",
    "Magic",
    "Mystery",
    "Secrets",
    "Hope",
    "Dreams",
];

const fakeBreweries = [
    "Brewery Azimuth",
    "Brewery Borealis",
    "Brewery Ceres",
    "Juliets Brewery",
    "Kalopsia Brewery",
    "Nobrew Brewery",
    "awesome brewery",
    "Brewery of the Gods",
    "Stupid Brewery",
    "Good ol' Brewery",
];

// lol
const poem = `
A glass of beer, a golden hue,
With each sip, the world feels new.
Laughter grows, the night’s a song,
But morning comes, the joy is gone.

Yet still, we drink, we toast, we cheer,
In every drop, both joy and fear.
A fleeting dance, a liquid fire,
In beer, we find both peace and ire.
`;

const randomNumber = (max: number) => Math.floor(Math.random() * max);
const randomItemFromArray = (arr: string[]) => arr[randomNumber(arr.length)];

// Create ingredients that use certain perecnt of the fake ingredients
// and always sum to 100%
const createIngredients = () => {
    const ingredients: string[] = [];
    let sum = 0;
    for (let i = 0; i < fakeIngredients.length; i++) {
        const percent = randomNumber(100 - sum);

        sum += percent;
        ingredients.push(`${fakeIngredients[i]}: ${percent}%`);
    }

    return ingredients;
};

const normalizeData = (beers: Beer[]) =>
    beers.map((beer) => {
        beer.description = poem;
        beer.brewery = randomItemFromArray(fakeBreweries);

        // If the price is a placeholder, generate a random price
        if (beer.price === "{{price}}" || beer.price === "{{&randomprice}}") {
            beer.price = randomNumber(200);
        }

        if (typeof beer.price === "string" || typeof beer.price === "number") {
            beer.price = priceToInt(beer.price);
        } else if (beer.price === undefined) {
            beer.price = 0;
        }

        beer.priceFormated = formatPrice(beer.price);

        return beer;
    });

export async function getBeers(): Promise<Beer[]> {
    try {
        const response = await fetch(process.env.API_ENDPOINT!);
        return normalizeData((await response.json()) as Beer[]);
    } catch (e) {
        throw new Error(`Failed to fetch beers: ${e}`);
    }
}
