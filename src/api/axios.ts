import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore.ts";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: `${API_URL}`,
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    const isRefreshRequest = config.url?.includes("/api/v1/refresh-token");
    const access_token = useAuthStore.getState().access_token;

    if (access_token && !isRefreshRequest) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token?: string) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else if (token) {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig | undefined;

        if (!originalRequest || error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const isAuthEndpoint =
            originalRequest.url?.includes("/api/v1/refresh-token") ||
            originalRequest.url?.includes("/api/v1/login");

        if (isAuthEndpoint || originalRequest._retry) {
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const currentRefreshToken = useAuthStore.getState().refresh_token;
        if (!currentRefreshToken) {
            isRefreshing = false;
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }

        try {
            const { refreshToken } = await import("@/shared/services/auth.ts");
            const response = await refreshToken({ refresh_token: currentRefreshToken });
            const newAccessToken = response.data?.access_token;
            const newRefreshToken = response.data?.refresh_token;

            if (!newAccessToken || !newRefreshToken) {
                throw error;
            }

            useAuthStore.getState().setAccessToken(newAccessToken);
            useAuthStore.getState().setRefreshToken(newRefreshToken);
            processQueue(null, newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);
            useAuthStore.getState().logout();
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);
