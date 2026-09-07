import { api } from "@/api/axios.ts";
import type { Response } from "@/shared/types/response.ts";

export type NotificationSubscriptionParams = {
    id: string;
    payload: PushSubscriptionJSON;
};

export type NotificationSubscription = {
    id: string;
    payload: PushSubscriptionJSON;
    enabled: boolean;
};

export type UpdateNotificationSubscriptionParams = {
    enabled: boolean;
};

export const createNotificationSubscription = async (
    payload: NotificationSubscriptionParams,
): Promise<Response<null>> => {
    const { data } = await api.post<Response<null>>("/api/v1/notification-subscription", payload);
    return data;
};

export const getNotificationSubscription = async (): Promise<Response<NotificationSubscription | null>> => {
    const { data } = await api.get<Response<NotificationSubscription | null>>("/api/v1/notification-subscription");
    return data;
};

export const updateNotificationSubscription = async (
    payload: UpdateNotificationSubscriptionParams,
): Promise<Response<null>> => {
    const { data } = await api.patch<Response<null>>("/api/v1/notification-subscription", payload);
    return data;
};
