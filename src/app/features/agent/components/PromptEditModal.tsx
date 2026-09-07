import { useEffect, useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import type { Prompt, UpdatePromptParams } from "@/app/features/agent/types/Prompt.ts";

type PromptEditModalProps = {
    prompt: Prompt | null;
    onClose: () => void;
    onSave: (key: string, payload: UpdatePromptParams) => Promise<void>;
};

const inputClassName =
    "w-full px-3.5 py-3 border border-gray-300 rounded-md text-base text-gray-800 transition-colors focus:outline-none focus:border-black";

const labelClassName = "text-sm text-gray-600";

const PromptEditModal = ({ prompt, onClose, onSave }: PromptEditModalProps) => {
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (!prompt) return;
        setDescription(prompt.description);
        setContent(prompt.content);
        setShowError(false);
    }, [prompt]);

    useEffect(() => {
        if (!prompt) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [prompt, onClose]);

    if (!prompt) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setShowError(false);

        try {
            await onSave(prompt.key, {
                description,
                content,
            });
        } catch (err) {
            setShowError(true);
            console.log(err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-8"
            onClick={onClose}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="prompt-edit-title"
                className="w-full max-w-2xl max-h-full flex flex-col bg-white border border-gray-300 rounded-md shadow-lg shadow-black/10"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                            <FaRobot className="text-lg" />
                        </div>
                        <div>
                            <h2 id="prompt-edit-title" className="text-lg text-gray-800 font-normal">
                                Editar prompt
                            </h2>
                            <p className="text-sm text-gray-400">ID: {prompt.id}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="flex items-center justify-center h-8 w-8 shrink-0 rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form
                    id="prompt-edit-form"
                    className="flex flex-col gap-5 px-6 sm:px-8 py-6 overflow-y-auto"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="prompt-description" className={labelClassName}>
                            Descripción
                        </label>
                        <input
                            id="prompt-description"
                            className={inputClassName}
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="prompt-content" className={labelClassName}>
                            Contenido
                        </label>
                        <textarea
                            id="prompt-content"
                            className={`${inputClassName} font-mono text-sm leading-relaxed resize-y`}
                            rows={10}
                            value={content}
                            required
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    {showError && (
                        <div className="border border-red-300 rounded-md flex justify-center bg-red-50">
                            <p className="font-light text-sm p-2 text-red-700">
                                No se pudo guardar el prompt
                            </p>
                        </div>
                    )}
                </form>

                <div className="flex flex-col-reverse sm:flex-row gap-2 px-6 sm:px-8 py-5 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md cursor-pointer transition-colors hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="prompt-edit-form"
                        disabled={isSaving}
                        className="flex-1 px-4 py-2.5 bg-black text-white rounded-md cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptEditModal;
