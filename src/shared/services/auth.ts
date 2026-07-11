import { api } from "@/api/axios.ts"
import type { Response } from "@/shared/types/response.ts";

export type AuthParams = {
    email: string;
    password: string;
}

type AuthData = {
    access_token?: string;
    refresh_token?: string;
}

export const login = async (payload: AuthParams): Promise<Response<AuthData>> => {
    const { data } = await api.post<Response<AuthData>>("/api/v1/login", payload);
    return data;
};
