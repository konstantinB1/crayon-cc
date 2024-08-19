import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridColDef,
    GridRowModesModel,
    GridRowId,
    GridEventListener,
} from "@mui/x-data-grid";
import useBoundStore from "@/store";
import { Beer } from "@/services/beer/api-beers";
import { omit } from "@/utils/object-utils";
import { useState } from "react";
import { Box } from "@mui/material";
import { BeerRow } from "./BeerTable.types";
import EditToolbar from "./EditToolbar";

const toBeerFromRow = (row: BeerRow): Beer =>
    omit(
        {
            ...row,
            rating: {
                average: row.average,
                reviews: row.reviews,
            },
        },
        ["isNew", "average", "reviews"],
    );

export default function FullFeaturedCrudGrid() {
    const rows = useBoundStore((state) =>
        state.beers.map<BeerRow>((beer) => ({
            id: beer.id,
            name: beer.name,
            image: beer.image,
            description: beer.description,
            price: beer.price,
            priceFormatted: beer.priceFormated,
            ingredients: beer.ingredients,
            brewery: beer.brewery,
            isNew: false,
            average: beer.rating.average,
            reviews: beer.rating.reviews,
        })),
    );

    const addBeer = useBoundStore((state) => state.addBeer);
    const removeBeer = useBoundStore((state) => state.deleteBeer);
    const updateBeer = useBoundStore((state) => state.updateBeer);
    const applyFilters = useBoundStore((state) => state.applyCurrentFilter);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event,
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => removeBeer(Number(id));

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            addBeer(toBeerFromRow(editedRow));
            applyFilters();
        }
    };

    const processRowUpdate = (newRow: BeerRow) => {
        const updatedRow = { ...newRow, isNew: false };
        updateBeer(toBeerFromRow(updatedRow));
        applyFilters();
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const onSetRow = (model: BeerRow) => {
        addBeer(toBeerFromRow(model));
        applyFilters();
    };

    const columns: GridColDef<BeerRow>[] = [
        { field: "id", headerName: "ID", width: 75 },
        { field: "name", headerName: "Name", width: 400, editable: true },
        {
            field: "priceFormatted",
            headerName: "Price",
            width: 100,
            sortComparator: (__, _, row1, row2) =>
                row1.api.getRow(row1.id).price - row2.api.getRow(row2.id).price,
            editable: true,
        },
        { field: "average", headerName: "Rating", width: 100 },
        { field: "brewery", headerName: "Brewery", width: 150, editable: true },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: "100%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { onSet: onSetRow, setRowModesModel },
                }}
            />
        </Box>
    );
}
