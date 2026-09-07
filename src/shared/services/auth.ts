import { api } from "@/api/axios.ts"
import type { Response } from "@/shared/types/response.ts";

export type AuthParams = {
    email: string;
    password: string;
}

export type RefreshTokenParams = {
    refresh_token: string;
}

export type ForgotPasswordParams = {
    email: string;
}

export type ResetPasswordParams = {
    token: string;
    password: string;
}

export type AuthData = {
    access_token?: string;
    refresh_token?: string;
    retry_after?: number;
}

export const login = async (payload: AuthParams): Promise<Response<AuthData>> => {
    const { data } = await api.post<Response<AuthData>>("/api/v1/login", payload);
    return data;
};

export const refreshToken = async (payload: RefreshTokenParams): Promise<Response<AuthData>> => {
    const { data } = await api.post<Response<AuthData>>("/api/v1/refresh-token", payload);
    return data;
};

export const forgotPassword = async (payload: ForgotPasswordParams): Promise<Response<null>> => {
    const { data } = await api.post<Response<null>>("/api/v1/forgot-password", payload);
    return data;
};

export const resetPassword = async (payload: ResetPasswordParams): Promise<Response<null>> => {
    const { data } = await api.post<Response<null>>("/api/v1/reset-password", payload);
    return data;
};

export const logout = async (): Promise<Response<null>> => {
    const { data } = await api.post<Response<null>>("/api/v1/logout");
    return data;
};
