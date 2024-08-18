import LandingView from "@/views/LandingView/LandingView";
import ProductDetail from "@/views/ProductDetail/ProductDetails";
import ProductManagement from "@/views/ProductManagement";
import { Alert, Container } from "@mui/material";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import StatusBar from "../StatusBar";
import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";

export default function AppContainer() {
    const appStatus = useBoundStore((state) => state.appStatus);
    const fetching = useBoundStore((state) => state.fetching);

    return (
        <Container
            maxWidth="lg"
            sx={{
                margin: "auto",
            }}
        >
            {appStatus === AppStatus.offline && (
                <Alert severity="error">You are offline</Alert>
            )}
            {appStatus === AppStatus.apiError && (
                <Alert severity="error">
                    Unable to fetch data from the server
                </Alert>
            )}
            {(appStatus === AppStatus.onlineWithLoadedData || fetching) && (
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
            )}
        </Container>
    );
}
