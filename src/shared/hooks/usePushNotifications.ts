import { useCallback } from "react";

import {
    registerServiceWorker,
    requestPermission,
    saveSubscription,
    subscribeToPush,
} from "@/shared/services/pushNotification";

export function usePushNotifications() {

    const subscribe = useCallback(async () => {

        try {

            await registerServiceWorker();

            const permission = await requestPermission();

            if (permission !== "granted") {
                alert("Permiso denegado");
                return;
            }

            const subscription = await subscribeToPush();

            console.log(subscription);

            await saveSubscription(subscription);

            alert("Notificaciones activadas");

        } catch (error) {
            console.error(error);
        }

    }, []);

    return {
        subscribe,
    };
}
