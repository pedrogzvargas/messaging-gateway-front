import { FaBars } from "react-icons/fa";
import { usePreferencesStore } from "@/store/preferencesStore.ts";
import NotificationBell from "@/shared/components/NotificationBell.tsx";

const Header = () => {
    const { activeAside, setShowAside } = usePreferencesStore();

    return (
        <header className="shrink-0 flex items-center justify-center bg-white py-3 border border-gray-300">
            <div className="container flex items-center px-4">
                <nav className="ml-2">
                    <ul className="flex gap-5">
                        <li>
                            <FaBars
                                onClick={() => setShowAside(!activeAside)}
                                className="cursor-pointer"
                            />
                        </li>
                    </ul>
                </nav>
                <div className="ml-auto flex gap-5 items-center justify-center">
                    <NotificationBell />
                </div>
            </div>
        </header>
    );
};

export default Header;
