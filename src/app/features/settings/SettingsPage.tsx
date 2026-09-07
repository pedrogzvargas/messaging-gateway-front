import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProfileForm from "@/app/features/settings/components/ProfileForm.tsx";
import ChangePasswordForm from "@/app/features/settings/components/ChangePasswordForm.tsx";
import NotificationsForm from "@/app/features/settings/components/NotificationsForm.tsx";

type SettingsTab = "account" | "security" | "notifications";

const tabs: { id: SettingsTab; label: string }[] = [
    { id: "account", label: "Cuenta" },
    { id: "security", label: "Seguridad" },
    { id: "notifications", label: "Notificaciones" },
];

const isSettingsTab = (value: string | null): value is SettingsTab =>
    tabs.some((tab) => tab.id === value);

const SettingsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState<SettingsTab>(
        isSettingsTab(initialTab) ? initialTab : "account",
    );

    const handleTabChange = (tab: SettingsTab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="container flex flex-col items-center justify-center w-full px-4">
                <div className="w-full mb-3">
                    <h1 className="font-normal text-lg pl-5 text-gray-600">Ajustes</h1>
                </div>

                <div className="w-full mb-4 border-b border-gray-300">
                    <div className="flex gap-1 pl-5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleTabChange(tab.id)}
                                className={`
                                    px-4 py-2 text-sm font-normal cursor-pointer
                                    border-b-2 -mb-px transition-colors
                                    ${
                                        activeTab === tab.id
                                            ? "border-black text-black"
                                            : "border-transparent text-gray-500 hover:text-black"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    {activeTab === "account" && <ProfileForm />}
                    {activeTab === "security" && <ChangePasswordForm />}
                    {activeTab === "notifications" && <NotificationsForm />}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
