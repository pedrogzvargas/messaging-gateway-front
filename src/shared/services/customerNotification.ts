import { api } from "@/api/axios.ts";
import type { PaginatedResponse } from "@/shared/types/response.ts";
import type { CustomerNotification } from "@/shared/types/CustomerNotification.ts";

type PaginationParams = {
    page?: number;
    limit?: number;
};

export const getCustomerNotifications = async ({
    limit = 5,
    page = 1,
}: PaginationParams = {}): Promise<PaginatedResponse<CustomerNotification>> => {
    const { data } = await api.get<PaginatedResponse<CustomerNotification>>("/api/v1/customer-notification", {
        params: { page, limit },
        timeout: 5000,
    });
    return data;
};
