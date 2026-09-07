import { api } from "@/api/axios.ts"
import type { PaginatedResponse } from "@/shared/types/response.ts";
import type { Response } from "@/shared/types/response.ts";
import type { Conversation } from "@/app/features/conversations/types/Conversation.ts";
import type { Message } from "@/app/features/conversations/types/Message.ts";

type PaginationParams = {
    page?: number;
    limit?: number;
    name?: string;
}

export type ConversationDetailData = {
    conversation: Conversation;
    messages: Message[];
}

export const getConversations = async ({limit = 10, page = 1, name = undefined}: PaginationParams): Promise<PaginatedResponse<Conversation>> => {
    const { data } = await api.get<PaginatedResponse<Conversation>>(
        "/api/v1/conversation",
        {params: {page, limit, name}, timeout: 5000},
    );
    return data;
};

export const getConversation = async (conversation_id: string): Promise<Response<Conversation>> => {
    const { data } = await api.get<Response<Conversation>>(
        `/api/v1/conversation/${conversation_id}`,
        {timeout: 5000},
    );
    return data;
};

export const getConversationMessages = async (conversation_id: string): Promise<Response<ConversationDetailData>> => {
    const { data } = await api.get<Response<ConversationDetailData>>(
        `/api/v1/conversation/${conversation_id}/message`,
        {timeout: 5000},
    );
    return data;
};
