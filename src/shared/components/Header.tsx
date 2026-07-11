import {Link} from "react-router-dom";
import {FaBell, FaBars} from "react-icons/fa";
import { usePreferencesStore } from "@/store/preferencesStore.ts";

const Header = () => {
    const { activeAside, setShowAside } = usePreferencesStore();

    return (
    <header className="flex items-center justify-center bg-white py-3 border border-gray-300">
        <div className="container flex items-center px-4">
            <nav className="ml-2">
                <ul className="flex gap-5">
                    <li>
                        <FaBars onClick={() => setShowAside(!activeAside)} className="cursor-pointer"/>
                    </li>
                </ul>
            </nav>
            <div className="ml-auto flex gap-5 items-center justify-center">
                <Link to="/login" className="text-xl"><FaBell/></Link>
            </div>
        </div>
    </header>
)}

export default Header
