import { api } from "@/api/axios.ts"
import type { PaginatedResponse } from "@/shared/types/response.ts";
import type { Response } from "@/shared/types/response.ts";
import type { Channel } from "@/app/features/channels/types/Channel.ts";

type PaginationParams = {
    page?: number;
    limit?: number;
    name?: string;
}

export const getChannels = async ({limit = 10, page = 1, name = undefined}: PaginationParams): Promise<PaginatedResponse<Channel>> => {
    const { data } = await api.get<PaginatedResponse<Channel>>("/api/v1/channel-account", {params: {page, limit, name}, timeout: 5000});
    return data;
};

export const getChannel = async (channel_id: string): Promise<Response<Channel>> => {
    const { data } = await api.get<Response<Channel>>(`/api/v1/channel-account/${channel_id}`);
    return data;
};
