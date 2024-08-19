jest.mock("./hooks/useImageLoader", () => ({
    __esModule: true,
    default: jest.fn(),
}));

import ImageRenderer from "./ImageRenderer";
import { renderWithThemeProvider } from "@/utils/render-test-utils";
import useImageLoader from "./hooks/useImageLoader";

const useImageLoaderMock = useImageLoader as jest.Mock;

const placeholderEnv = process.env.PLACEHOLDER_IMG_URL;

describe("ImageRenderer", () => {
    const render = () => renderWithThemeProvider(<ImageRenderer image="123" />);

    afterAll(() => {
        process.env.PLACEHOLDER_IMG_URL = placeholderEnv;
    });

    it("should render skeleton element if image is not loaded", () => {
        useImageLoaderMock.mockReturnValue({
            exists: false,
            loading: true,
        });

        const { getByTestId } = render();
        expect(getByTestId("image-skeleton")).toBeInTheDocument();
    });

    it("should render image element if image is not loading", () => {
        useImageLoaderMock.mockReturnValue({
            exists: false,
            loading: false,
        });

        const { getByTestId } = render();
        expect(getByTestId("image")).toBeInTheDocument();
    });

    it("should render placeholder src", () => {
        process.env.PLACEHOLDER_IMG_URL = "123";

        useImageLoaderMock.mockReturnValue({
            exists: false,
            loading: false,
        });

        const { getByTestId } = render();

        expect(getByTestId("image").getAttribute("src")).toBe("123");
    });
});
