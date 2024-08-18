import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingView from "./views/LandingView/LandingView";
import useGetBeers from "./hooks/useGetBeers";
import { Container, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "./theme";
import ProductDetail from "./views/ProductDetail/ProductDetails";
import StatusBar from "@/components/StatusBar";
import ProductManagement from "./views/ProductManagement";

export default function App() {
    useGetBeers();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles
                styles={({ palette }) => ({
                    body: {
                        backgroundColor: palette.background.default,
                        color: palette.text.primary,
                    },
                })}
            />
            <Container
                maxWidth="lg"
                sx={{
                    margin: "auto",
                }}
            >
                <BrowserRouter>
                    <StatusBar />
                    <Routes>
                        <Route path="/" element={<LandingView />} />
                        <Route path="/beer/:id" element={<ProductDetail />} />
                        <Route
                            path="/product-management"
                            element={<ProductManagement />}
                        />
                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    );
}
