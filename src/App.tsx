import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingView from "./views/LandingView/LandingView";
import useGetBeers from "./hooks/useGetBeers";
import { Box, Container, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "./theme";
import ProductDetail from "./views/ProductDetail/ProductDetails";
import StatusBar from "./views/LandingView/components/StatusBar/StatusBar";

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
                <StatusBar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingView />} />
                        <Route path="/beer/:id" element={<ProductDetail />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    );
}
