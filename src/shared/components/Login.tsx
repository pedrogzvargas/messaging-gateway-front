import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "@/shared/assets/images/logo.png"
import { login } from "@/shared/services/auth.ts"
import { useAuthStore } from "@/store/authStore.ts"

const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [bockedAccount, setBockedAccount] = useState<boolean>(false);
    const navigate = useNavigate();
    const { setIsAuthenticated, setAccessToken, setRefreshToken } = useAuthStore();

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login({ email, password });
            setIsAuthenticated(true)
            setBockedAccount(false)
            setAccessToken(response.data?.access_token)
            setRefreshToken(response.data?.access_token)
            navigate("/");
        } catch (error: unknown) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
     }

    return (
        <div className="flex flex-col items-center justify-center h-3/4">
            <div className="bg-white p-10 rounded-md md:w-1/4 w-full">
                <img src={logo} alt="Logo" />
                <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
                    <input
                        className="w-full pl-2 py-2 border border-black shadow-sm focus:shadow-black focus:outline-none rounded-sm text-lg"
                        type="email"
                        placeholder="Correo"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                    />
                    <input
                        className="w-full pl-2 py-2 border border-black shadow-sm focus:shadow-black focus:outline-none rounded-sm text-lg"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-full py-2 bg-black text-white rounded-sm cursor-pointer"
                        type="submit">Iniciar Sesión
                    </button>
                </form>
                <div className="flex flex-col md:items-end items-center mt-1">
                    <NavLink to="/forgot-password" className="text-sm">¿Olvidaste tu contraseña?</NavLink>
                </div>
                {showError && (
                    <div className="border border-red-300 rounded-sm flex justify-center bg-red-50">
                        <h1 className="font-light text-sm p-1 text-red-700">{ bockedAccount ? "Cuenta bloqueda intenta en 5 minutos" : "Error al iniciar sessión"}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login;
