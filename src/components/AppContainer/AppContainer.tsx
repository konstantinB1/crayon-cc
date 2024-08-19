import { Alert, Container } from "@mui/material";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import StatusBar from "../StatusBar";
import useBoundStore from "@/store";
import { AppStatus } from "@/store/root";
import { lazy, Suspense } from "react";

const LandingView = lazy(() => import("@/views/LandingView/LandingView"));
const ProductDetail = lazy(
    () => import("@/views/ProductDetail/ProductDetails"),
);
const ProductManagement = lazy(() => import("@/views/ProductManagement"));

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
            {appStatus === AppStatus.apiError && (
                <Alert severity="error">
                    Unable to fetch data from the server
                </Alert>
            )}

            <BrowserRouter>
                <StatusBar />
                <Suspense>
                    <Routes>
                        <Route path="/" element={<LandingView />} />
                        <Route path="/beer/:id" element={<ProductDetail />} />
                        <Route
                            path="/product-management"
                            element={<ProductManagement />}
                        />
                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </Container>
    );
}
