import { Route } from "react-router-dom";
import AutLayout from "@/shared/layouts/AuthLayout.tsx";
import LoginPage from "@/shared/pages/LoginPage.tsx";
import ForgotPasswordPage from "@/shared/pages/ForgotPasswordPage.tsx";
import PublicRoute from "@/shared/routes/PublicRoute.tsx";


export const SharedRoutes = (
    <Route element={<AutLayout />}>
        <Route element={ <PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
    </Route>
)
