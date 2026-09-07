import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface PreferencesStore {
    activeAside: boolean
    notificationsEnabled: boolean
    setShowAside: (showAside: boolean) => void
    setNotificationsEnabled: (enabled: boolean) => void
}

export const usePreferencesStore = create<PreferencesStore>()(persist(
    (set) => (
        {
            activeAside: false,
            notificationsEnabled: false,
            setShowAside: (showAside: boolean) => set({ activeAside: showAside }),
            setNotificationsEnabled: (enabled: boolean) => set({ notificationsEnabled: enabled }),
        }
    ), {name: "PreferencesStore"})
)
