import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import useBoundStore from "@/store";
import { useMemo } from "react";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "rating", headerName: "Rating", width: 100 },
    { field: "brewery", headerName: "Brewery", width: 150 },
];

export default function StatsTable() {
    const beers = useBoundStore((state) => state.beers);
    const normalizeRows = useMemo(
        () =>
            beers.map((beer) => ({
                id: beer.id,
                name: beer.name,
                price: beer.priceFormated,
                rating: Math.ceil(beer.rating.average),
                brewery: beer.brewery,
            })),
        [beers],
    );
    return (
        <Box>
            <DataGrid
                sx={{
                    height: 600,
                }}
                rows={normalizeRows}
                columns={columns}
            />
        </Box>
    );
}
