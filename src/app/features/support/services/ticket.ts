import { api } from "@/api/axios.ts";
import type { PaginatedResponse, Response } from "@/shared/types/response.ts";
import type { CreateTicketParams, Ticket } from "@/app/features/support/types/Ticket.ts";

type PaginationParams = {
    page?: number;
    limit?: number;
    name?: string;
};

export const getTickets = async ({
    limit = 10,
    page = 1,
    name = undefined,
}: PaginationParams): Promise<PaginatedResponse<Ticket>> => {
    const { data } = await api.get<PaginatedResponse<Ticket>>("/api/v1/ticket", {
        params: { page, limit, name },
        timeout: 5000,
    });
    return data;
};

export const createTicket = async (payload: CreateTicketParams): Promise<Ticket> => {
    const { data } = await api.post<Ticket>("/api/v1/ticket", payload, {
        timeout: 5000,
    });
    return data;
};

export const getTicket = async (id: string): Promise<Response<Ticket>> => {
    const { data } = await api.get<Response<Ticket>>(`/api/v1/ticket/${id}`, {
        timeout: 5000,
    });
    return data;
};

export const closeTicket = async (id: string): Promise<Ticket> => {
    const { data } = await api.patch<Ticket>(`/api/v1/ticket/${id}/close`, {
        timeout: 5000,
    });
    return data;
};
