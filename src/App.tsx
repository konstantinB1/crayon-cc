import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingView from "./views/LandingView/LandingView";
import useGetBeers from "./hooks/useGetBeers";
import { Box, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "./theme";

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
            <Box width={1200} margin="auto">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingView />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}
