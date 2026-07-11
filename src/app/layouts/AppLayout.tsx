import Aside from "@/shared/components/Aside.tsx";
import Header from "@/shared/components/Header.tsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Aside />
            <div className="w-full">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;