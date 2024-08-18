import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { ReactNode } from "react";

export const renderWithThemeProvider = (node: ReactNode) =>
    render(node, {
        wrapper: ({ children }) => (
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ),
    });
