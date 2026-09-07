import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaExclamationCircle } from "react-icons/fa";
import { getCustomerNotifications } from "@/shared/services/customerNotification.ts";
import type { CustomerNotification } from "@/shared/types/CustomerNotification.ts";
import { formatRelativeTime } from "@/shared/utils/formatRelativeTime.ts";

const NotificationBell = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<CustomerNotification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchNotifications = async () => {
        try {
            const response = await getCustomerNotifications({ limit: 5 });
            setNotifications(response.results);
            setHasError(false);
        } catch (err) {
            setHasError(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications().catch(console.error);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const handleSeeMore = () => {
        setIsOpen(false);
        navigate("/settings?tab=notifications");
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                aria-label="Notificaciones"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setIsOpen((open) => !open)}
                className="relative text-xl text-gray-700 hover:text-black cursor-pointer p-1"
            >
                <FaBell />
                {notifications.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                        {notifications.length > 9 ? "9+" : notifications.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-[min(100vw-2rem,22rem)] bg-white border border-gray-300 rounded-md shadow-lg shadow-black/10 z-50 overflow-hidden">
                    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200">
                        <p className="text-sm text-gray-700">Notificaciones</p>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {isLoading && (
                            <div className="px-4 py-8 text-center text-sm text-gray-400">
                                Cargando...
                            </div>
                        )}

                        {!isLoading && hasError && (
                            <div className="flex items-center justify-center gap-2 px-4 py-8 text-center text-sm text-red-600">
                                <FaExclamationCircle className="shrink-0" />
                                No se pudieron cargar las notificaciones
                            </div>
                        )}

                        {!isLoading && !hasError && notifications.length === 0 && (
                            <div className="px-4 py-8 text-center">
                                <FaBell className="mx-auto text-3xl text-gray-200 mb-2" />
                                <p className="text-sm text-gray-400">
                                    No hay notificaciones
                                </p>
                            </div>
                        )}

                        {!isLoading && !hasError && notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="w-full px-4 py-3 border-b border-gray-100 last:border-b-0"
                            >
                                <p className="text-sm text-gray-800 line-clamp-2">
                                    {notification.content}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-1.5">
                                    {formatRelativeTime(notification.created_at)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleSeeMore}
                        className="w-full text-center text-sm text-gray-600 hover:text-black hover:bg-gray-50 cursor-pointer px-4 py-3 border-t border-gray-200"
                    >
                        Ver más
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
