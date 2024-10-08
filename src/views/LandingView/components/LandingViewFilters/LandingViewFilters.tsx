import {
    Box,
    Button,
    ListSubheader,
    MenuItem,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import useFilter from "./hooks/useFilter";
import { SortKey } from "@/services/beer/beers-utils";
import useBoundStore from "@/store";
import { formatPrice } from "@/utils/price-utils";

type LandingViewFiltersProps = {
    onChange?: () => void;
};

/**
 * TODO Make 2 modes - onChange and onSubmit
 * So when on low screen the filters would
 * be only applied when the user submits the form
 */
export default function LandingViewFilters({
    onChange,
}: LandingViewFiltersProps) {
    const fetching = useBoundStore((state) => state.fetching);
    const { clear, formState, getMinAndMaxPrice, sortBy, setPriceRange } =
        useFilter();
    const [min, max] = getMinAndMaxPrice;
    const { sortKey: currentSortKey } = formState;

    return (
        <Stack position="sticky" top={10} component="aside">
            <Stack display="flex" flexDirection="column" gap={2}>
                <TextField
                    id="sort-by"
                    disabled={fetching}
                    value={currentSortKey}
                    onChange={(e) => {
                        sortBy(e.target.value as SortKey);
                        onChange?.();
                    }}
                    select
                    label="Sort by"
                    size="small"
                    placeholder="Sort by"
                >
                    <ListSubheader>Name</ListSubheader>
                    <MenuItem value={SortKey.nameAsc}>
                        Name - Ascending
                    </MenuItem>
                    <MenuItem value={SortKey.nameDesc}>
                        Name - Descending
                    </MenuItem>
                    <ListSubheader>Price</ListSubheader>
                    <MenuItem value={SortKey.priceAsc}>
                        Price - Ascending
                    </MenuItem>
                    <MenuItem value={SortKey.priceDesc}>
                        Price - Descending
                    </MenuItem>
                    <ListSubheader>Rating</ListSubheader>
                    <MenuItem value={SortKey.ratingAsc}>
                        Rating - Ascending
                    </MenuItem>
                    <MenuItem value={SortKey.ratingDesc}>
                        Rating - Descending
                    </MenuItem>
                </TextField>
                <Box px={2}>
                    <Typography id="input-slider" gutterBottom>
                        Price range
                    </Typography>
                    <Slider
                        disabled={fetching}
                        valueLabelDisplay="auto"
                        onChangeCommitted={(_, value) => {
                            setPriceRange(value as number[]);
                        }}
                        getAriaValueText={(value) => `${value.toString()}$`}
                        marks={[
                            { value: min, label: formatPrice(min) },
                            { value: max, label: formatPrice(max) },
                        ]}
                        sx={{
                            "& .MuiSlider-markLabel": {
                                '&[data-index="0"]': {
                                    marginLeft: 1,
                                },
                                '&[data-index="1"]': {
                                    transform: "translateX(-40px)",
                                },
                            },
                        }}
                        min={min}
                        max={max}
                        defaultValue={[min, max]}
                    />
                </Box>
                <Box mt={2} display="flex" justifyContent="center" gap={1}>
                    <Button disabled={fetching} onClick={clear}>
                        Clear
                    </Button>
                </Box>
            </Stack>
        </Stack>
    );
}
