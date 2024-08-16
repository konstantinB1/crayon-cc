import { SortKey } from "./services/beer/beers-utils";

export type OrderBy = "asc" | "desc";

export type FormState = {
    priceRange: number[];
    sortKey: SortKey;
};
