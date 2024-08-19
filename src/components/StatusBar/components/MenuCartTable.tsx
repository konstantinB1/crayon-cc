import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
    Box,
} from "@mui/material";
import AddButton from "@/components/AddButton";
import RemoveButton from "@/components/RemoveButton";

import { CheckoutSummary } from "@/store/cart";

type MenuCartTableProps = {
    items: CheckoutSummary;
};

export default function MenuCartTable({ items }: MenuCartTableProps) {
    return (
        <Box maxHeight={200} overflow="auto" px={1}>
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

                        p: {
                            lg: 1,
                            md: 1,
                            sm: 1,
                            xs: 0.5,
                        },
                    },

                    "& tr": {
                        height: 60,
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
                <TableHead
                    sx={{
                        display: {
                            xl: "table-header-group",
                            lg: "table-header-group",
                            md: "table-header-group",
                            sm: "table-header-group",
                            xs: "none",
                        },
                    }}
                >
                    <TableRow>
                        <TableCell>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Item
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Price
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(({ item, itemTotal }) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Typography variant="body1">
                                    {item.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">
                                    {itemTotal}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box display="flex" gap={1}>
                                    <AddButton id={item.id} quantity={1} />
                                    <RemoveButton id={item.id} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
