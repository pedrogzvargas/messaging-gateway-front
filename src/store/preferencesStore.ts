import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface PreferencesStore {
    activeAside: boolean
    setShowAside: (showAside: boolean) => void
}

export const usePreferencesStore = create<PreferencesStore>()(persist(
    (set) => (
        {
            activeAside: false,
            setShowAside: (showAside: boolean) => set({ activeAside: showAside }),
        }
    ), {name: "PreferencesStore"})
)
