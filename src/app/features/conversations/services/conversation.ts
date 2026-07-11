import { api } from "@/api/axios.ts"
import type { PaginatedResponse } from "@/shared/types/response.ts";
import type { Response } from "@/shared/types/response.ts";
import type { Conversation } from "@/app/features/conversations/types/Conversation.ts";

type PaginationParams = {
    page?: number;
    limit?: number;
    name?: string;
}

export const getConversations = async ({limit = 10, page = 1, name = undefined}: PaginationParams): Promise<PaginatedResponse<Conversation>> => {
    const { data } = await api.get<PaginatedResponse<Conversation>>("/api/v1/conversation", {params: {page, limit, name}, timeout: 5000});
    return data;
};

export const getConversation = async (conversation_id: string): Promise<Response<Conversation>> => {
    const { data } = await api.get<Response<Conversation>>(`/api/v1/conversation/${conversation_id}`);
    return data;
};
