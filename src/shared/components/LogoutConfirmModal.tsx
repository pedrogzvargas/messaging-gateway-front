import { useEffect } from "react";
import { FaUserLock } from "react-icons/fa";

type LogoutConfirmModalProps = {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

const LogoutConfirmModal = ({ open, onCancel, onConfirm }: LogoutConfirmModalProps) => {
    useEffect(() => {
        if (!open) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
            onClick={onCancel}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-confirm-title"
                aria-describedby="logout-confirm-description"
                className="w-full max-w-sm bg-white border border-gray-300 rounded-md shadow-lg shadow-black/10 p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-600 mb-4 mx-auto">
                    <FaUserLock className="text-xl" />
                </div>

                <h2
                    id="logout-confirm-title"
                    className="text-lg text-gray-800 text-center font-normal mb-1"
                >
                    Cerrar sesión
                </h2>
                <p
                    id="logout-confirm-description"
                    className="text-sm text-gray-500 text-center font-light mb-6"
                >
                    ¿Seguro que quieres salir de Messaging Gateway? Tendrás que iniciar
                    sesión de nuevo para continuar.
                </p>

                <div className="flex flex-col-reverse sm:flex-row gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-sm cursor-pointer hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-black text-white rounded-sm cursor-pointer hover:bg-gray-800"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmModal;
