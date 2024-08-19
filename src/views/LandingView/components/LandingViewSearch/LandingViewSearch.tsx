import { Box, Card, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useBoundStore from "@/store";
import { useDebouncedCallback } from "use-debounce";

export default function LandingViewSearch() {
    const searchAction = useBoundStore((state) => state.searchAction);
    const debounceSearch = useDebouncedCallback(searchAction, 300);

    return (
        <Box mb={2}>
            <Card variant="outlined">
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search Beers"
                    variant="standard"
                    autoComplete="off"
                    onChange={(e) => debounceSearch(e.currentTarget.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                sx={{
                                    mr: 2,
                                }}
                                position="start"
                            >
                                <SearchIcon
                                    sx={(theme) => ({
                                        fill: theme.palette.text.secondary,
                                    })}
                                />
                            </InputAdornment>
                        ),
                        sx: {
                            p: 1.5,
                            pb: 1.1,

                            "&::before": {
                                borderBottom: 0,
                            },
                        },
                    }}
                    sx={{
                        p: 0,
                    }}
                />
            </Card>
        </Box>
    );
}
