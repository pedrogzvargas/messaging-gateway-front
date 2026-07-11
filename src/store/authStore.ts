import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface AuthStore {
    isAuthenticated: boolean
    access_token?: string
    refresh_token?: string
    setIsAuthenticated: (showAside: boolean) => void
    setAccessToken: (access_token?: string) => void
    setRefreshToken: (refresh_token?: string) => void
    logout: () => void
}

const initialState = {
    isAuthenticated: false,
    access_token: undefined,
    refresh_token: undefined,
}

export const useAuthStore = create<AuthStore>()(persist(
    (set) => (
        {
            ...initialState,
            setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated: isAuthenticated }),
            setAccessToken: (access_token?: string) => set({ access_token: access_token }),
            setRefreshToken: (refresh_token?: string) => set({ refresh_token: refresh_token }),
            logout: () => set(initialState),
        }
    ), {name: "AuthStore"})
)
