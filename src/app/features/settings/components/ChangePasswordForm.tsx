import { useState } from "react";
import { FaShieldAlt, FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "@/app/features/settings/services/settings.ts";
import { useAuthStore } from "@/store/authStore.ts";

const inputClassName =
    "w-full px-3.5 pr-10 py-3 border border-gray-300 rounded-md text-base text-gray-800 transition-colors focus:outline-none focus:border-black";

const inputErrorClassName =
    "w-full px-3.5 pr-10 py-3 border border-red-400 rounded-md text-base text-gray-800 transition-colors focus:outline-none focus:border-red-400";

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { logout } = useAuthStore();

    const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
    const samePassword = currentPassword.length > 0 && newPassword.length > 0 && newPassword === currentPassword;
    const fieldsIncomplete = !currentPassword || !newPassword || !confirmPassword;

    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccess(false);
        setErrorMessage(null);

        if (passwordsMismatch) {
            return;
        }

        if (samePassword) {
            return;
        }

        if (newPassword.length < 8) {
            setErrorMessage("La nueva contraseña debe tener al menos 8 caracteres");
            return;
        }

        setIsSaving(true);

        try {
            await changePassword({
                password: currentPassword,
                new_password: newPassword,
            });
            resetForm();
            setShowSuccess(true);
            setTimeout(() => {
                logout();
            }, 2000);
        } catch (err) {
            setErrorMessage("No se pudo cambiar la contraseña");
            setTimeout(() => setErrorMessage(null), 3000);
            console.log(err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white border border-gray-300 rounded-md w-full max-w-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                    <FaShieldAlt className="text-lg" />
                </div>
                <div>
                    <h2 className="text-base text-gray-800 font-normal">Cambiar contraseña</h2>
                    <p className="text-sm text-gray-400">
                        Usa una contraseña segura de al menos 8 caracteres.
                    </p>
                </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="current-password" className="text-sm text-gray-600">
                        Contraseña actual
                    </label>
                    <div className="relative">
                        <input
                            id="current-password"
                            className={inputClassName}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Contraseña actual"
                            value={currentPassword}
                            required
                            maxLength={50}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                            onClick={() => setShowCurrentPassword((previous) => !previous)}
                            aria-label={showCurrentPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            tabIndex={-1}
                        >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="new-password" className="text-sm text-gray-600">
                        Nueva contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="new-password"
                            className={samePassword ? inputErrorClassName : inputClassName}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            required
                            minLength={8}
                            maxLength={50}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                            onClick={() => setShowNewPassword((previous) => !previous)}
                            aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            tabIndex={-1}
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {samePassword && (
                        <p className="text-xs text-red-600 font-light">
                            La nueva contraseña debe ser diferente a la actual.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="confirm-password" className="text-sm text-gray-600">
                        Confirmar contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="confirm-password"
                            className={passwordsMismatch ? inputErrorClassName : inputClassName}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            required
                            minLength={8}
                            maxLength={50}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                            onClick={() => setShowConfirmPassword((previous) => !previous)}
                            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {passwordsMismatch && (
                        <p className="text-xs text-red-600 font-light">
                            Las contraseñas no coinciden.
                        </p>
                    )}
                </div>

                <div className="pt-1">
                    <button
                        className="px-5 py-2.5 bg-black text-white rounded-md cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isSaving || fieldsIncomplete || passwordsMismatch || samePassword}
                    >
                        {isSaving ? "Actualizando..." : "Actualizar contraseña"}
                    </button>
                </div>
            </form>

            {showSuccess && (
                <div className="flex items-center gap-2 border border-green-300 rounded-md bg-green-50 mt-5 p-3">
                    <FaCheckCircle className="text-green-600 shrink-0" />
                    <p className="font-light text-sm text-green-700">
                        Contraseña actualizada correctamente. Cerrando sesión...
                    </p>
                </div>
            )}

            {errorMessage && (
                <div className="flex items-center gap-2 border border-red-300 rounded-md bg-red-50 mt-5 p-3">
                    <FaExclamationCircle className="text-red-600 shrink-0" />
                    <p className="font-light text-sm text-red-700">{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ChangePasswordForm;
