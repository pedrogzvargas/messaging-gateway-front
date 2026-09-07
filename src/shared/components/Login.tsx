import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaClock, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import logo from "@/shared/assets/images/logo.png";
import { login } from "@/shared/services/auth.ts";
import { useAuthStore } from "@/store/authStore.ts";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [retryAfter, setRetryAfter] = useState<number>(0);
    const [initialRetryAfter, setInitialRetryAfter] = useState<number>(0);
    const navigate = useNavigate();
    const { setIsAuthenticated, setAccessToken, setRefreshToken } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (retryAfter > 0) return;

        setErrorMessage(null);

        try {
            const response = await login({ email, password });
            setIsAuthenticated(true);
            setRetryAfter(0);
            setInitialRetryAfter(0);
            setAccessToken(response.data?.access_token);
            setRefreshToken(response.data?.refresh_token);
            navigate("/");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const response = error.response;

                if (response?.status === 429 && response.data?.data?.retry_after) {
                    const waitSeconds = Number(response.data.data.retry_after);
                    setRetryAfter(waitSeconds);
                    setInitialRetryAfter(waitSeconds);
                    return;
                }

                if (response?.status === 401) {
                    setErrorMessage("Correo o contraseña incorrectos.");
                    return;
                }

                if (response?.status === 429) {
                    setErrorMessage("Demasiados intentos. Intenta de nuevo más tarde.");
                    return;
                }
            }

            setErrorMessage("No se pudo iniciar sesión. Intenta de nuevo.");
        }
    };

    useEffect(() => {
        if (retryAfter <= 0) return;

        const timer = setTimeout(() => {
            setRetryAfter((previous) => (previous <= 1 ? 0 : previous - 1));
        }, 1000);

        return () => clearTimeout(timer);
    }, [retryAfter]);

    useEffect(() => {
        if (retryAfter === 0 && initialRetryAfter > 0) {
            setInitialRetryAfter(0);
        }
    }, [retryAfter, initialRetryAfter]);

    const minutes = Math.floor(retryAfter / 60);
    const seconds = retryAfter % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    const progressPercent =
        initialRetryAfter > 0
            ? Math.round(((initialRetryAfter - retryAfter) / initialRetryAfter) * 100)
            : 0;
    const isLocked = retryAfter > 0;

    return (
        <div className="flex flex-col items-center justify-center h-3/4">
            <div className="bg-white p-10 rounded-md md:w-1/4 w-full">
                <img src={logo} alt="Logo" />

                <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
                    <input
                        className="w-full pl-2 py-2 border border-black shadow-sm focus:shadow-black focus:outline-none rounded-sm text-lg disabled:bg-gray-50 disabled:text-gray-400"
                        type="email"
                        placeholder="Correo electrónico"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                        disabled={isLocked}
                    />
                    <div className="relative">
                        <input
                            className="w-full pl-2 pr-10 py-2 border border-black shadow-sm focus:shadow-black focus:outline-none rounded-sm text-lg disabled:bg-gray-50 disabled:text-gray-400"
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLocked}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 disabled:text-gray-300"
                            onClick={() => setShowPassword((previous) => !previous)}
                            disabled={isLocked}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            tabIndex={-1}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        disabled={isLocked}
                        className={`
                            w-full py-2 text-white rounded-sm transition-colors
                            ${isLocked ? "bg-gray-400 cursor-not-allowed" : "bg-black cursor-pointer hover:bg-gray-800"}
                        `}
                        type="submit"
                    >
                        {isLocked ? `Espera ${formattedTime}` : "Iniciar Sesión"}
                    </button>
                </form>

                {errorMessage && !isLocked && (
                    <div className="mt-3 rounded-sm border border-red-200 bg-red-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <FaExclamationCircle className="text-red-600 text-xs shrink-0" />
                            <p className="text-xs text-red-800 font-light leading-snug">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                )}

                {isLocked && (
                    <div className="mt-3 rounded-sm border border-amber-200 bg-amber-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <FaClock className="text-amber-600 text-xs shrink-0" />
                            <p className="text-xs text-amber-800 font-light leading-snug">
                                Demasiados intentos. Vuelve a intentar en{" "}
                                <span className="tabular-nums font-normal">{formattedTime}</span>
                            </p>
                        </div>
                        <div className="mt-2 h-1 w-full rounded-full bg-amber-100 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-amber-400 transition-all duration-1000 ease-linear"
                                style={{ width: `${progressPercent}%` }}
                                role="progressbar"
                                aria-valuenow={progressPercent}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label="Progreso de espera"
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:items-end items-center mt-1">
                    <NavLink to="/forgot-password" className="text-sm">
                        ¿Olvidaste tu contraseña?
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
