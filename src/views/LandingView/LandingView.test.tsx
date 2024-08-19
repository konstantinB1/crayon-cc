import { screen } from "@testing-library/react";
import Chance from "chance";

const c = Chance();

jest.mock("./hooks/useLandingViewData", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("./components/LandingViewCard", () => () => <div>card</div>);
jest.mock("./components/LandingViewFilters", () => () => <div>filters</div>);

import useLandingViewData from "./hooks/useLandingViewData";
import LandingView from "./LandingView";
import { placeholderBeers } from "./LandingView.utils";
import { renderWithThemeProvider } from "@/utils/render-test-utils";

const useLandingViewDataMock = useLandingViewData as jest.Mock;

describe("LandingView", () => {
    afterEach(() => {
        jest.resetModules();
    });

    it('should render n ammount of "LandingViewCard" components', () => {
        const beers = Array.from({
            length: c.integer({ min: 1, max: 10 }),
        }).map(() => ({
            id: c.guid(),
            image: c.url(),
            name: c.word(),
            price: c.floating({ min: 1, max: 100 }),
            rating: c.floating({ min: 1, max: 5 }),
        }));

        useLandingViewDataMock.mockReturnValue({
            beers,
            fetchedInitial: true,
        });

        renderWithThemeProvider(<LandingView />);

        expect(screen.getAllByText("card").length).toBe(beers.length);
    });

    it("if data is not fetched show placeholder cards", () => {
        useLandingViewDataMock.mockReturnValue({
            beers: placeholderBeers,
            fetchedInitial: false,
        });

        renderWithThemeProvider(<LandingView />);

        expect(screen.getAllByText("card").length).toBe(
            placeholderBeers.length,
        );
    });
});
