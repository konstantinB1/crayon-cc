import { useCartStore } from "@/store";
import { Box, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function CardStatus({ id }: { id: number }) {
    const { items } = useCartStore(({ items }) => ({ items }));
    const added = items.some((item) => item === id);

    return <Box width="100%"></Box>;
}
