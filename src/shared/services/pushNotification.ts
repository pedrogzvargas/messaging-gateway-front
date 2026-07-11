const PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);

    return Uint8Array.from(
        [...rawData].map((char) => char.charCodeAt(0))
    );
}

export async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        throw new Error("Service Worker no soportado");
    }

    return navigator.serviceWorker.register("/sw.js");
}

export async function requestPermission() {
    return Notification.requestPermission();
}

export async function subscribeToPush(): Promise<PushSubscription> {

    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (subscription) {
        return subscription;
    }

    subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
    });

    return subscription;
}

export async function saveSubscription(subscription: PushSubscription) {
    console.log(PUBLIC_KEY);
    await fetch("/api/v1/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
    });
}
