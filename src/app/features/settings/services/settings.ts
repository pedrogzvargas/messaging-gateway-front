import { api } from "@/api/axios.ts";
import type { Response } from "@/shared/types/response.ts";
import type {
    ChangePasswordParams,
    UpdateProfileParams,
    User,
} from "@/app/features/settings/types/User.ts";

export const getProfile = async (): Promise<Response<User>> => {
    const { data } = await api.get<Response<User>>("/api/v1/me", { timeout: 5000 });
    return data;
};

export const updateProfile = async (
    payload: UpdateProfileParams,
): Promise<Response<User>> => {
    const { data } = await api.patch<Response<User>>("/api/v1/me", payload, {
        timeout: 5000,
    });
    return data;
};

export const changePassword = async (
    payload: ChangePasswordParams,
): Promise<Response<null>> => {
    const { data } = await api.post<Response<null>>("/api/v1/change-password", payload, {
        timeout: 5000,
    });
    return data;
};
