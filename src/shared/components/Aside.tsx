import { NavLink, useNavigate } from "react-router-dom";
import { usePreferencesStore } from "@/store/preferencesStore.ts";
import { useAuthStore } from "@/store/authStore.ts";

import {
    FaHome,
    FaHeadphonesAlt,
    FaUserLock,
    FaRocketchat,
    FaCogs,
    FaNetworkWired,
    FaUsers,
} from "react-icons/fa";

const Aside = () => {
    const { activeAside } = usePreferencesStore();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        useAuthStore.persist.clearStorage()
        navigate("/login")
    }

    return (
        <aside className={`
        bg-white
        text-black
        shadow-lg
        shadow-black/10
        flex
        flex-col
        transition-all
        duration-100
        ${activeAside ? "w-64" : "w-0 overflow-hidden"}`
        }>
            <div className="py-5 text-lg font-bold border-b border-gray-100 text-center">
                Messaging Gateway
            </div>
            <nav className="p-4 space-y-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `
                        flex items-center gap-2 rounded-md px-3 py-1
                        ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100 hover:text-black'}
                        `
                    }
                >
                    <FaHome /> Home
                </NavLink>
                <NavLink
                    to="/channel"
                    className={({ isActive }) =>
                        `
                        flex items-center gap-2 rounded-md px-3 py-1
                        ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100 hover:text-black'}
                        `
                    }
                >
                    <FaNetworkWired /> Canales
                </NavLink>
                <NavLink
                    to="/conversation"
                    className={({ isActive }) =>
                        `
                        flex items-center gap-2 rounded-md px-3 py-1
                        ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100 hover:text-black'}
                        `
                    }
                >
                    <FaRocketchat /> Conversaciones
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `
                        flex items-center gap-2 rounded-md px-3 py-1
                        ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100 hover:text-black'}
                        `
                    }
                >
                    <FaUsers /> Contactos
                </NavLink>
                <NavLink
                    to="/support"
                    className={({ isActive }) =>
                        `
                        flex items-center gap-2 rounded-md px-3 py-1
                        ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100 hover:text-black'}
                        `
                    }
                >
                    <FaHeadphonesAlt /> Soporte
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `
                        flex items-center gap-2 rounded-md px-3 py-1
                        ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100 hover:text-black'}
                        `
                    }
                >
                    <FaCogs /> Ajustes
                </NavLink>
            </nav>

            <a className="
                flex
                items-center
                mt-auto
                gap-3
                bg-black
                text-white
                rounded-md
                hover:bg-white
                hover:text-black
                hover:border border-black
                p-1
                m-4
                justify-center
                cursor-pointer
                " onClick={handleLogout}>
                <FaUserLock /> Cerrar sesión
            </a>
        </aside>
    )
}

export default Aside;
