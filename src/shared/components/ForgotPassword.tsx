import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "@/shared/assets/images/logo.png"

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
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
                <div className="border border-green-400 rounded-md">
                    <p className="font-light text-sm text-center text-green-600">
                        Se enviará un enlace a tu correo electrónico con las instrucciones para recuperar tu cuenta.
                    </p>
                </div>
                <form className="space-y-5 mt-3" onSubmit={handleSubmit}>
                    <input
                        className="w-full pl-2 py-2 border border-black shadow-sm focus:shadow-black focus:outline-none rounded-sm text-lg"
                        type="email"
                        placeholder="Correo"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                    />
                    <button
                        className="w-full py-2 bg-black text-white rounded-sm cursor-pointer"
                        type="submit">Recuperar contraseña
                    </button>
                </form>
                <div className="flex flex-col md:items-end items-center mt-1">
                    <NavLink to="/login" className="text-sm">¿Iniciar sesión?</NavLink>
                </div>
                {showError && (
                    <div className="border border-red-300 rounded-sm flex justify-center bg-red-50">
                        <h1 className="font-light text-sm p-1 text-red-700">Error al recuperar cuenta</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword;
