import { createTheme } from "@mui/material";

declare module "@mui/material/styles/createMixins" {
    interface Mixins {
        flexCenter: CSSProperties;
    }
}

export default createTheme({
    mixins: {
        flexCenter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    palette: {
        mode: "dark",
        background: {
            default: "#1a1a1a",
        },
        primary: {
            main: "#ed684e",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});
