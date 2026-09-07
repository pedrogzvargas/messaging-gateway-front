import { useCallback, useState } from "react";

import {
    registerServiceWorker,
    requestPermission,
    subscribeToPush,
} from "@/shared/services/pushNotification";
import {
    createNotificationSubscription,
    getNotificationSubscription,
    updateNotificationSubscription,
    type NotificationSubscription,
} from "@/shared/services/notificationSubscription";

export function usePushNotifications() {

    const [isChecking, setIsChecking] = useState(false);

    const checkSubscription = useCallback(async (): Promise<NotificationSubscription | null> => {
        setIsChecking(true);
        try {
            const response = await getNotificationSubscription();
            return response.data ?? null;
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setIsChecking(false);
        }
    }, []);

    const subscribe = useCallback(async () => {

        try {

            const existing = await checkSubscription();

            if (existing) {
                await updateNotificationSubscription({ enabled: true });
                return;
            }

            await registerServiceWorker();

            const permission = await requestPermission();

            if (permission !== "granted") {
                alert("Permiso denegado");
                return;
            }

            const subscription = await subscribeToPush();

            await createNotificationSubscription({
                id: crypto.randomUUID(),
                payload: subscription.toJSON(),
            });

            alert("Notificaciones activadas");

        } catch (error) {
            console.error(error);
        }

    }, [checkSubscription]);

    const unsubscribe = useCallback(async () => {
        try {
            await updateNotificationSubscription({ enabled: false });
        } catch (error) {
            console.error(error);
        }
    }, []);

    return {
        subscribe,
        unsubscribe,
        checkSubscription,
        isChecking,
    };
}
