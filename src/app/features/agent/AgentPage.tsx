import { useState } from "react";
import FaqList from "@/app/features/agent/components/FaqList.tsx";
import PromptList from "@/app/features/agent/components/PromptList.tsx";

type AgentTab = "faqs" | "prompts";

const AgentPage = () => {
    const [activeTab, setActiveTab] = useState<AgentTab>("faqs");

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="container flex flex-col items-center justify-center w-full px-4">
                <div className="w-full mb-3">
                    <h1 className="font-normal text-lg pl-5 text-gray-600">Agente</h1>
                </div>

                <div className="w-full mb-4 border-b border-gray-300">
                    <div className="flex gap-1 pl-5">
                        <button
                            type="button"
                            onClick={() => setActiveTab("faqs")}
                            className={`
                                px-4 py-2 text-sm font-normal cursor-pointer
                                border-b-2 -mb-px transition-colors
                                ${
                                    activeTab === "faqs"
                                        ? "border-black text-black"
                                        : "border-transparent text-gray-500 hover:text-black"
                                }
                            `}
                        >
                            FAQs
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("prompts")}
                            className={`
                                px-4 py-2 text-sm font-normal cursor-pointer
                                border-b-2 -mb-px transition-colors
                                ${
                                    activeTab === "prompts"
                                        ? "border-black text-black"
                                        : "border-transparent text-gray-500 hover:text-black"
                                }
                            `}
                        >
                            Prompts
                        </button>
                    </div>
                </div>

                {activeTab === "faqs" ? <FaqList /> : <PromptList />}
            </div>
        </div>
    );
};

export default AgentPage;
