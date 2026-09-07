import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FaLock, FaExclamationCircle, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "@/shared/assets/images/logo.png";
import { resetPassword } from "@/shared/services/auth.ts";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!token) {
            setErrorMessage("No se encontró un token de recuperación válido en el enlace.");
            return;
        }

        if (passwordsMismatch) {
            return;
        }

        setIsSubmitting(true);

        try {
            await resetPassword({ token, password });
            setShowSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error: unknown) {
            setErrorMessage("No se pudo restablecer la contraseña. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-3/4">
            <div className="bg-white p-10 rounded-md md:w-1/4 w-full">
                <img src={logo} alt="Logo" className="mb-6" />

                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                        <FaLock className="text-lg" />
                    </div>
                    <div>
                        <h1 className="text-base text-gray-800 font-normal">Nueva contraseña</h1>
                        <p className="text-sm text-gray-400">
                            Estás por definir la contraseña con la que iniciarás sesión.
                        </p>
                    </div>
                </div>

                {!token && (
                    <div className="mt-4 rounded-sm border border-amber-200 bg-amber-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <FaExclamationCircle className="text-amber-600 text-xs shrink-0" />
                            <p className="text-xs text-amber-800 font-light leading-snug">
                                No se encontró un token de recuperación válido en el enlace.
                            </p>
                        </div>
                    </div>
                )}

                <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            className="w-full pl-2 pr-10 py-2 border border-black shadow-sm focus:shadow-black focus:outline-none rounded-sm text-lg"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nueva contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            value={password}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                            onClick={() => setShowPassword((previous) => !previous)}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            tabIndex={-1}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div>
                        <div className="relative">
                            <input
                                className={`w-full pl-2 pr-10 py-2 border shadow-sm focus:outline-none rounded-sm text-lg ${
                                    passwordsMismatch
                                        ? "border-red-400 focus:shadow-red-400"
                                        : "border-black focus:shadow-black"
                                }`}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirmar contraseña"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                value={confirmPassword}
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
                            <p className="mt-1.5 text-xs text-red-600 font-light">
                                Las contraseñas no coinciden.
                            </p>
                        )}
                    </div>
                    <button
                        className="w-full py-2 bg-black text-white rounded-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isSubmitting || passwordsMismatch}>
                        <FaLock className="text-sm" />
                        {isSubmitting ? "Guardando..." : "Guardar nueva contraseña"}
                    </button>
                </form>

                <div className="flex flex-col md:items-end items-center mt-1">
                    <NavLink to="/login" className="text-sm">¿Iniciar sesión?</NavLink>
                </div>

                {showSuccess && (
                    <div className="mt-3 rounded-sm border border-green-200 bg-green-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600 text-xs shrink-0" />
                            <p className="text-xs text-green-800 font-light leading-snug">
                                Contraseña actualizada. Te llevaremos a iniciar sesión...
                            </p>
                        </div>
                    </div>
                )}

                {errorMessage && !showSuccess && (
                    <div className="mt-3 rounded-sm border border-red-200 bg-red-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <FaExclamationCircle className="text-red-600 text-xs shrink-0" />
                            <p className="text-xs text-red-800 font-light leading-snug">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResetPassword;
