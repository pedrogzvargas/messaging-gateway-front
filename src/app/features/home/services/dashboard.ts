import { api } from "@/api/axios.ts";
import type { Response } from "@/shared/types/response.ts";
import type { DashboardSummary } from "@/app/features/home/types/Dashboard.ts";

export const getDashboardSummary = async (): Promise<Response<DashboardSummary>> => {
    const { data } = await api.get<Response<DashboardSummary>>("/api/v1/dashboard/summary", {
        timeout: 5000,
    });
    return data;
};
