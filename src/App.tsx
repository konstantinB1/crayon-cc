import useGetBeers from "./hooks/useGetBeers";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "./theme";
import AppContainer from "./components/AppContainer/AppContainer";

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
            <AppContainer />
        </ThemeProvider>
    );
}
