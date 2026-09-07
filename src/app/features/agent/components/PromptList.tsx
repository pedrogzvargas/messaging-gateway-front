import PromptEditModal from "@/app/features/agent/components/PromptEditModal.tsx";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { FaCommentDots, FaBook, FaChevronRight } from "react-icons/fa";
import type { Prompt, UpdatePromptParams } from "@/app/features/agent/types/Prompt.ts";
import {
    getContextPrompt,
    getGreetingPrompt,
    updateContextPrompt,
    updateGreetingPrompt,
} from "@/app/features/agent/services/agent.ts";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";

const sections = [
    {
        key: "greeting",
        title: "Saludo",
        description: "Mensaje inicial que el agente envía para comenzar la conversación.",
        icon: FaCommentDots,
        getPrompt: getGreetingPrompt,
        updatePrompt: updateGreetingPrompt,
    },
    {
        key: "context",
        title: "Contexto",
        description: "Información base que el agente usa para responder.",
        icon: FaBook,
        getPrompt: getContextPrompt,
        updatePrompt: updateContextPrompt,
    },
];

const PromptList = () => {
    const [prompts, setPrompts] = useState<Record<string, Prompt | undefined>>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

    const fetchPrompts = async () => {
        try {
            const results = await Promise.all(
                sections.map(async (section) => {
                    try {
                        const response = await section.getPrompt();
                        return response.data;
                    } catch (err) {
                        if (isAxiosError(err) && err.response?.status === 404) {
                            return undefined;
                        }
                        throw err;
                    }
                }),
            );
            const next: Record<string, Prompt | undefined> = {};
            sections.forEach((section, index) => {
                next[section.key] = results[index];
            });
            setPrompts(next);
        } catch (err) {
            setHasError(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecover = async () => {
        setIsLoading(true);
        setHasError(false);
        await fetchPrompts();
    };

    const handleSavePrompt = async (key: string, payload: UpdatePromptParams) => {
        const section = sections.find((s) => s.key === key);
        if (!section) return;

        await section.updatePrompt(payload);
        const response = await section.getPrompt();
        setPrompts((current) => ({ ...current, [key]: response.data }));
        setSelectedPrompt(null);
    };

    useEffect(() => {
        fetchPrompts().catch(console.error);
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            {isLoading && <Spinner />}

            {!isLoading && !hasError && (
                <div className="w-full flex flex-col gap-4">
                    {sections.map((section) => {
                        const prompt = prompts[section.key];
                        const Icon = section.icon;

                        return (
                            <div
                                key={section.key}
                                className={`bg-white border border-gray-300 rounded-md w-full p-6 ${
                                    prompt ? "cursor-pointer transition-colors hover:bg-gray-50" : ""
                                }`}
                                onClick={() => prompt && setSelectedPrompt(prompt)}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                                            <Icon className="text-lg" />
                                        </div>
                                        <div>
                                            <h2 className="text-base text-gray-800 font-normal">
                                                {section.title}
                                            </h2>
                                            <p className="text-sm text-gray-400">{section.description}</p>
                                        </div>
                                    </div>
                                    {prompt && (
                                        <FaChevronRight className="text-gray-300 shrink-0 mt-3" />
                                    )}
                                </div>

                                {prompt ? (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            {prompt.description && (
                                                <span className="text-xs text-gray-400 truncate">
                                                    {prompt.description}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 font-light line-clamp-3">
                                            {prompt.content}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400 font-light">
                                        Aún no hay un prompt configurado para esta sección.
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {hasError && !isLoading && <UnexpectedError onRetry={handleRecover} />}

            <PromptEditModal
                prompt={selectedPrompt}
                onClose={() => setSelectedPrompt(null)}
                onSave={handleSavePrompt}
            />
        </div>
    );
};

export default PromptList;
