export type Beer = {
    placeholder: boolean;
    price?: string | number;
    name?: string;
    image?: string;
    id?: number;
    rating?: {
        average: number;
        reviews: number;
    };
};

export async function getBeers(): Promise<Beer[]> {
    try {
        const response = await fetch(process.env.API_ENDPOINT!);
        return (await response.json()) as Beer[];
    } catch (e) {
        throw new Error(`Failed to fetch beers: ${e}`);
    }
}
