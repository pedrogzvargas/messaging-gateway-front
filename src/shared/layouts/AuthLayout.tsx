import {Outlet} from "react-router-dom";

const AutLayout = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default AutLayout
