import { api } from "@/api/axios.ts";
import type { PaginatedResponse, Response } from "@/shared/types/response.ts";
import type { CreateFaqParams, Faq, UpdateFaqParams } from "@/app/features/agent/types/Faq.ts";
import type { Prompt, UpdatePromptParams } from "@/app/features/agent/types/Prompt.ts";

type PaginationParams = {
    page?: number;
    limit?: number;
    name?: string;
};

export const getFaqs = async ({
    limit = 10,
    page = 1,
    name = undefined,
}: PaginationParams): Promise<PaginatedResponse<Faq>> => {
    const { data } = await api.get<PaginatedResponse<Faq>>("/api/v1/faq", {
        params: { page, limit, name },
        timeout: 5000,
    });
    return data;
};

export const createFaq = async (payload: CreateFaqParams): Promise<Faq> => {
    const { data } = await api.post<Faq>("/api/v1/faq", payload, {
        timeout: 5000,
    });
    return data;
};

export const updateFaq = async (id: string, payload: UpdateFaqParams): Promise<Faq> => {
    const { data } = await api.patch<Faq>(`/api/v1/faq/${id}`, payload, {
        timeout: 5000,
    });
    return data;
};

export const getGreetingPrompt = async (): Promise<Response<Prompt>> => {
    const { data } = await api.get<Response<Prompt>>("/api/v1/business-prompt/greeting", {
        timeout: 5000,
    });
    return data;
};

export const getContextPrompt = async (): Promise<Response<Prompt>> => {
    const { data } = await api.get<Response<Prompt>>("/api/v1/business-prompt/context", {
        timeout: 5000,
    });
    return data;
};

export const updateGreetingPrompt = async (payload: UpdatePromptParams): Promise<Prompt> => {
    const { data } = await api.patch<Prompt>("/api/v1/business-prompt/greeting", payload, {
        timeout: 5000,
    });
    return data;
};

export const updateContextPrompt = async (payload: UpdatePromptParams): Promise<Prompt> => {
    const { data } = await api.patch<Prompt>("/api/v1/business-prompt/context", payload, {
        timeout: 5000,
    });
    return data;
};
