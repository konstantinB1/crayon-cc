import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./hooks/useGetBeers", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("./components/AppContainer/AppContainer", () => ({
    __esModule: true,
    default: jest.fn(),
}));

import useGetBeers from "./hooks/useGetBeers";
import AppContainer from "./components/AppContainer/AppContainer";

describe("App", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Ensure useGetBeers in startup", () => {
        expect(useGetBeers).toHaveBeenCalled();
    });

    it("Ensure AppContainer is called", () => {
        expect(AppContainer).toHaveBeenCalled();
    });
});
