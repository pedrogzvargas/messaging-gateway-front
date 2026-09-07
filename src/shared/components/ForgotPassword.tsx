import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import logo from "@/shared/assets/images/logo.png";
import { forgotPassword } from "@/shared/services/auth.ts";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowSuccess(false);
        setShowError(false);

        try {
            await forgotPassword({ email });
            setShowSuccess(true);
        } catch (error: unknown) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-3/4">
            <div className="bg-white p-10 rounded-md md:w-1/4 w-full">
                <img src={logo} alt="Logo" />

                <div className="mt-8 rounded-sm border border-green-200 bg-green-50 px-3 py-2">
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-green-600 text-xs shrink-0" />
                        <p className="text-xs text-green-800 font-light leading-snug">
                            Se enviará un enlace a tu correo electrónico con las
                            instrucciones para recuperar tu cuenta.
                        </p>
                    </div>
                </div>

                <form className="space-y-5 mt-3" onSubmit={handleSubmit}>
                    <input
                        className="w-full pl-2 py-2 border border-black shadow-sm focus:shadow-black focus:outline-none rounded-sm text-lg"
                        type="email"
                        placeholder="Correo electrónico"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                    />
                    <button
                        className="w-full py-2 bg-black text-white rounded-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Recuperar contraseña"}
                    </button>
                </form>
                <div className="flex flex-col md:items-end items-center mt-1">
                    <NavLink to="/login" className="text-sm">¿Iniciar sesión?</NavLink>
                </div>
                {showSuccess && (
                    <div className="flex items-center gap-2 border border-green-300 rounded-sm bg-green-50 mt-3 px-3 py-2">
                        <FaCheckCircle className="text-green-600 shrink-0" />
                        <p className="font-light text-sm text-green-700">
                            Solicitud enviada, revisa tu correo electrónico.
                        </p>
                    </div>
                )}
                {showError && (
                    <div className="flex items-center gap-2 border border-red-300 rounded-sm bg-red-50 mt-3 px-3 py-2">
                        <FaExclamationCircle className="text-red-600 shrink-0" />
                        <p className="font-light text-sm text-red-700">
                            No se pudo enviar la solicitud, intenta de nuevo.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword;
