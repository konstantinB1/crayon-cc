import { randomItemFromArray, randomNumber } from "@/utils/object-utils";
import { priceToInt } from "@/utils/order-utils";
import { formatPrice } from "@/utils/price-utils";

export type Beer = {
    placeholder?: boolean;
    price?: string | number;
    name?: string;
    image?: string;
    ingredients?: [string, number][];
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

// Mutates the array
function shuffle<T>(array: T[]) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}

// Create ingredients that use certain perecnt of the fake ingredients
// and always sum to 100%
const createIngredients = () => {
    const ingredients: [string, number][] = [];
    let sum = 0;

    shuffle(fakeIngredients);

    for (let i = 0; i < fakeIngredients.length; i++) {
        const percent = randomNumber(100 - sum);

        if (sum >= 100) {
            break;
        }

        sum += percent;
        ingredients.push([fakeIngredients[i], percent]);
    }

    return ingredients.filter(([, percent]) => percent > 0);
};

const normalizeData = (beers: Beer[]): Beer[] =>
    beers.map((beer) => {
        beer.description = poem;
        beer.brewery = randomItemFromArray(fakeBreweries);
        beer.ingredients = createIngredients();

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
    const response = await fetch(process.env.API_ENDPOINT!, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    return normalizeData((await response.json()) as Beer[]);
}
