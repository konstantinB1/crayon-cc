import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
    Box,
    Divider,
} from "@mui/material";
import AddButton from "@/components/AddButton";
import RemoveButton from "@/components/RemoveButton";

import { CheckoutSummary } from "@/store/cart";

type MenuCartTableProps = {
    items: CheckoutSummary;
};

export default function MenuCartTable({ items }: MenuCartTableProps) {
    return (
        <Table
            sx={{
                borderCollapse: "collapse",
                border: 0,

                "& td, & th": {
                    border: 0,

                    display: {
                        xs: "block",
                        sm: "table-cell",
                    },
                },

                "& tr th": {
                    display: {
                        lg: "table-cell",
                        md: "table-cell",
                        sm: "table-cell",
                        xs: "none",
                    },
                },
            }}
            size="small"
        >
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="caption" color="text.secondary">
                            Item
                        </Typography>
                    </TableCell>
                    <TableCell colSpan={1}>
                        <Typography variant="caption" color="text.secondary">
                            Price
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map(({ item, itemTotal }) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Typography variant="body1">{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">{itemTotal}</Typography>
                        </TableCell>
                        <TableCell>
                            <Box display="flex" gap={1}>
                                <AddButton id={item.id} quantity={1} />
                                <RemoveButton id={item.id} />
                            </Box>
                        </TableCell>
                        <Divider
                            sx={{
                                my: 2,
                            }}
                        />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
