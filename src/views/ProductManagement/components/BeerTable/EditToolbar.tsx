import { Button } from "@mui/material";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import { BeerRow, RowModel } from "./BeerTable.types";

type EditToolbarProps = {
    onSet: (model: BeerRow) => void;
    setRowModesModel: Dispatch<SetStateAction<RowModel>>;
};

const emptyRow: BeerRow = {
    id: -1,
    name: "",
    price: 0,
    priceFormated: "",
    ingredients: [],
    brewery: "",
    isNew: true,
    average: 0,
    reviews: 0,
};

export default function EditToolbar({
    onSet,
    setRowModesModel,
}: EditToolbarProps) {
    const handleClick = () => {
        const row = emptyRow;
        onSet(row);

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [String(row.id)]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}
            >
                Add record
            </Button>
        </GridToolbarContainer>
    );
}
