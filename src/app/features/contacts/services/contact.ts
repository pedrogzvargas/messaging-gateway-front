import { api } from "@/api/axios.ts"
import type { PaginatedResponse } from "@/shared/types/response.ts";
import type { Response } from "@/shared/types/response.ts";
import type { Contact } from "@/app/features/contacts/types/Contact.ts";

type PaginationParams = {
    page?: number;
    limit?: number;
    name?: string;
}

export const getContacts = async ({limit = 10, page = 1, name = undefined}: PaginationParams): Promise<PaginatedResponse<Contact>> => {
    const { data } = await api.get<PaginatedResponse<Contact>>("/api/v1/contact", {params: {page, limit, name}, timeout: 5000});
    return data;
};

export const getContact = async (contact_id: string): Promise<Response<Contact>> => {
    const { data } = await api.get<Response<Contact>>(`/api/v1/contact/${contact_id}`);
    return data;
};
