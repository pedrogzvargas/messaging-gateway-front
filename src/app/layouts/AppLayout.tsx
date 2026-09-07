import Aside from "@/shared/components/Aside.tsx";
import Header from "@/shared/components/Header.tsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Aside />
            <div className="flex flex-col w-full min-w-0 min-h-0">
                <Header />
                <main className="flex-1 min-h-0 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AppLayout;