jest.mock("./hooks/useFilter", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("@/store", () => ({
    __esModule: true,
    default: jest.fn(),
}));

import userEvent from "@testing-library/user-event";

import LandingViewFilters from "./LandingViewFilters";
import { renderWithThemeProvider } from "@/utils/render-test-utils";
import useFilter from "./hooks/useFilter";
import useBoundStore from "@/store";

const useFilterMock = useFilter as jest.Mock;
const useBoundStoreMock = useBoundStore as jest.Mock;

describe("LandingViewFilter", () => {
    it('should call clear when "Clear" button is clicked', async () => {
        const clear = jest.fn();

        useFilterMock.mockReturnValue({
            clear,
            formState: {},
            getMinAndMaxPrice: [0, 100],
            sortBy: () => {},
            setPriceRange: () => {},
        });
        useBoundStoreMock.mockReturnValue(false);

        const { getByText } = renderWithThemeProvider(<LandingViewFilters />);

        const clearButton = getByText("Clear");

        await userEvent.click(clearButton);

        expect(useFilter).toHaveBeenCalled();
    });
});
