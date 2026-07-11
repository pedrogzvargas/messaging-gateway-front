import {Navigate, Outlet} from "react-router-dom";
import { useAuthStore } from "@/store/authStore.ts";

function PrivateRoute() {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default PrivateRoute;
