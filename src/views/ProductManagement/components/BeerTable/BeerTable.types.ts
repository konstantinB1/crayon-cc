import { Beer } from "@/services/beer/api-beers";
import { GridRowModes } from "@mui/x-data-grid";

export type RowModel = {
    [id: string]: {
        mode: GridRowModes;
        fieldToFocus?: Partial<keyof BeerRow>;
        ignoreModifications?: boolean;
    };
};

export type BeerRow = Omit<Beer, "rating"> & { isNew: boolean } & {
    average: number;
    reviews: number;
};
