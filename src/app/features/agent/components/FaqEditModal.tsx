import { useEffect, useState } from "react";
import { FaQuestionCircle, FaTimes } from "react-icons/fa";
import type { Faq, UpdateFaqParams } from "@/app/features/agent/types/Faq.ts";

export type FaqModalState = { mode: "create" } | { mode: "edit"; faq: Faq } | null;

type FaqEditModalProps = {
    state: FaqModalState;
    onClose: () => void;
    onSave: (payload: UpdateFaqParams) => Promise<void>;
};

const inputClassName =
    "w-full px-3.5 py-3 border border-gray-300 rounded-md text-base text-gray-800 transition-colors focus:outline-none focus:border-black";

const labelClassName = "text-sm text-gray-600";

const FaqEditModal = ({ state, onClose, onSave }: FaqEditModalProps) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showError, setShowError] = useState(false);

    const isEdit = state?.mode === "edit";

    useEffect(() => {
        if (!state) return;

        if (state.mode === "edit") {
            setQuestion(state.faq.question);
            setAnswer(state.faq.answer);
            setIsActive(state.faq.is_active);
        } else {
            setQuestion("");
            setAnswer("");
            setIsActive(true);
        }

        setShowError(false);
    }, [state]);

    useEffect(() => {
        if (!state) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [state, onClose]);

    if (!state) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setShowError(false);

        try {
            await onSave({ question, answer, is_active: isActive });
            onClose();
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
                aria-labelledby="faq-edit-title"
                className="w-full max-w-2xl max-h-full flex flex-col bg-white border border-gray-300 rounded-md shadow-lg shadow-black/10"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                            <FaQuestionCircle className="text-lg" />
                        </div>
                        <div>
                            <h2 id="faq-edit-title" className="text-lg text-gray-800 font-normal">
                                {isEdit ? "Editar FAQ" : "Nueva FAQ"}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {isEdit ? `ID: ${state.faq.id}` : "Agrega una nueva pregunta frecuente"}
                            </p>
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
                    id="faq-edit-form"
                    className="flex flex-col gap-5 px-6 sm:px-8 py-6 overflow-y-auto"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="faq-question" className={labelClassName}>
                            Pregunta
                        </label>
                        <input
                            id="faq-question"
                            className={inputClassName}
                            type="text"
                            value={question}
                            required
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="faq-answer" className={labelClassName}>
                            Respuesta
                        </label>
                        <textarea
                            id="faq-answer"
                            className={`${inputClassName} text-sm leading-relaxed resize-y`}
                            rows={6}
                            value={answer}
                            required
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-md px-4 py-3">
                        <div>
                            <p className="text-sm text-gray-700">Activo</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Define si esta FAQ se muestra al usuario.
                            </p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isActive}
                            onClick={() => setIsActive((prev) => !prev)}
                            className={`
                                relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
                                transition-colors
                                ${isActive ? "bg-black" : "bg-gray-300"}
                            `}
                        >
                            <span
                                className={`
                                    pointer-events-none inline-block h-5 w-5 rounded-full bg-white
                                    shadow transform transition translate-y-0.5
                                    ${isActive ? "translate-x-5" : "translate-x-0.5"}
                                `}
                            />
                        </button>
                    </div>

                    {showError && (
                        <div className="border border-red-300 rounded-md flex justify-center bg-red-50">
                            <p className="font-light text-sm p-2 text-red-700">
                                No se pudo guardar la FAQ
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
                        form="faq-edit-form"
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

export default FaqEditModal;
