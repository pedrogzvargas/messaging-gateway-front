import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { usePreferencesStore } from "@/store/preferencesStore.ts";
import { usePushNotifications } from "@/shared/hooks/usePushNotifications.ts";
import { getCustomerNotifications } from "@/shared/services/customerNotification.ts";
import type { CustomerNotification } from "@/shared/types/CustomerNotification.ts";
import { formatRelativeTime } from "@/shared/utils/formatRelativeTime.ts";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";
import Paginator from "@/shared/components/Paginator.tsx";

const NotificationsForm = () => {
    const { notificationsEnabled, setNotificationsEnabled } = usePreferencesStore();
    const { subscribe, unsubscribe, checkSubscription, isChecking } = usePushNotifications();

    const [notifications, setNotifications] = useState<CustomerNotification[] | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchNotifications = async (page: number) => {
        try {
            const response = await getCustomerNotifications({ page, limit: 5 });
            setNotifications(response.results);
            setTotalPages(response.pages);
            setHasError(false);
        } catch (err) {
            setHasError(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecover = async () => {
        setIsLoading(true);
        setHasError(false);
        await fetchNotifications(page);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage === page) return;
        setIsLoading(true);
        setPage(newPage);
    };

    useEffect(() => {
        checkSubscription()
            .then((subscription) => setNotificationsEnabled(Boolean(subscription?.enabled)))
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetchNotifications(page).catch(console.error);
    }, [page]);

    const handleNotificationsToggle = async () => {
        const nextValue = !notificationsEnabled;

        if (nextValue) {
            await subscribe();
        } else {
            await unsubscribe();
        }

        setNotificationsEnabled(nextValue);
    };

    return (
        <div className="bg-white border border-gray-300 rounded-md w-full max-w-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                    <FaBell className="text-lg" />
                </div>
                <div>
                    <h2 className="text-base text-gray-800 font-normal">Notificaciones</h2>
                    <p className="text-sm text-gray-400">
                        Administra tus notificaciones y alertas del sistema.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 py-4 border-y border-gray-200">
                <div>
                    <p className="text-sm text-gray-700">Notificaciones push</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Recibe alertas de mensajes y actividad del sistema.
                    </p>
                </div>
                <button
                    type="button"
                    role="switch"
                    aria-checked={notificationsEnabled}
                    onClick={handleNotificationsToggle}
                    disabled={isChecking}
                    className={`
                        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
                        transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                        ${notificationsEnabled ? "bg-black" : "bg-gray-300"}
                    `}
                >
                    <span
                        className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white
                            shadow transform transition translate-y-0.5
                            ${notificationsEnabled ? "translate-x-5" : "translate-x-0.5"}
                        `}
                    />
                </button>
            </div>

            <div className="mt-5">
                <p className="text-sm text-gray-700 mb-3">Últimas notificaciones</p>

                <div className="border border-gray-200 rounded-md divide-y divide-gray-100">
                    {isLoading && (
                        <div className="flex justify-center py-6">
                            <Spinner />
                        </div>
                    )}

                    {!isLoading && hasError && <UnexpectedError onRetry={handleRecover} />}

                    {!isLoading && !hasError && notifications !== undefined && notifications.length === 0 && (
                        <ResultsNotFund subtitle="No tienes notificaciones" />
                    )}

                    {!isLoading && !hasError && notifications !== undefined && notifications.length > 0 &&
                        notifications.map((notification) => (
                            <div key={notification.id} className="px-4 py-3">
                                <p className="text-sm text-gray-800">{notification.content}</p>
                                <p className="text-[11px] text-gray-400 mt-1">
                                    {formatRelativeTime(notification.created_at)}
                                </p>
                            </div>
                        ))}
                </div>

                {!isLoading && !hasError && notifications !== undefined && notifications.length > 0 && (
                    <Paginator
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default NotificationsForm;
