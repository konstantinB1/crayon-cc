import { Box, Button, ButtonGroup } from "@mui/material";

export default function StatsTableActions() {
    return (
        <Box display="flex" justifyContent="flex-end" mb={2}>
            <ButtonGroup>
                <Button>Add</Button>
                <Button>Remove</Button>
            </ButtonGroup>
        </Box>
    );
}
