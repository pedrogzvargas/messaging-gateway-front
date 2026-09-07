import { useEffect, useState } from "react";
import { FaExclamationCircle, FaHeadphonesAlt, FaTimes } from "react-icons/fa";

type TicketCreateModalProps = {
    open: boolean;
    onClose: () => void;
    onCreate: (details: string) => Promise<void>;
};

const inputClassName =
    "w-full px-3.5 py-3 border border-gray-300 rounded-md text-base text-gray-800 transition-colors focus:outline-none focus:border-black";

const labelClassName = "text-sm text-gray-600";

const TicketCreateModal = ({ open, onClose, onCreate }: TicketCreateModalProps) => {
    const [details, setDetails] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (!open) return;
        setDetails("");
        setShowError(false);
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setShowError(false);

        try {
            await onCreate(details);
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
                aria-labelledby="ticket-create-title"
                className="w-full max-w-2xl max-h-full flex flex-col bg-white border border-gray-300 rounded-md shadow-lg shadow-black/10"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                            <FaHeadphonesAlt className="text-lg" />
                        </div>
                        <div>
                            <h2 id="ticket-create-title" className="text-lg text-gray-800 font-normal">
                                Nuevo ticket
                            </h2>
                            <p className="text-sm text-gray-400">
                                Cuéntanos qué inconveniente estás presentando
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
                    id="ticket-create-form"
                    className="flex flex-col gap-5 px-6 sm:px-8 py-6 overflow-y-auto"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="ticket-details" className={labelClassName}>
                            Detalle
                        </label>
                        <textarea
                            id="ticket-details"
                            className={`${inputClassName} text-sm leading-relaxed resize-y`}
                            rows={6}
                            value={details}
                            required
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>

                    {showError && (
                        <div className="rounded-sm border border-red-200 bg-red-50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <FaExclamationCircle className="text-red-600 text-xs shrink-0" />
                                <p className="text-xs text-red-800 font-light leading-snug">
                                    No se pudo crear el ticket
                                </p>
                            </div>
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
                        form="ticket-create-form"
                        disabled={isSaving}
                        className="flex-1 px-4 py-2.5 bg-black text-white rounded-md cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSaving ? "Enviando..." : "Enviar ticket"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketCreateModal;
