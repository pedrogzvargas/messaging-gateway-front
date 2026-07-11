import {Link} from "react-router-dom";
import {FaHome} from "react-icons/fa";

const NotFound = () => (
    <div className="flex items-center justify-center">
        <div className="px-80 py-30 flex flex-col items-center bg-gray-100/70 rounded-2xl mt-10">
            <h1 className="text-gray-500 text-7xl">:( 404</h1>
            <h1 className="text-gray-500 text-4xl mt-1">Página no encontrada</h1>
            <Link to="/" className="flex items-center bg-black text-white mt-5 rounded-md px-6 py-1 gap-1">
                <FaHome />
                <p>Volver al inicio</p>
            </Link>
        </div>
    </div>
)

export default NotFound
