import { useEffect, useRef, useState } from "react";
import { FaUser, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import {
    getProfile,
    updateProfile,
} from "@/app/features/settings/services/settings.ts";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";

const inputClassName =
    "w-full px-3.5 py-3 border border-gray-300 rounded-md text-base text-gray-800 transition-colors focus:outline-none focus:border-black";

const ProfileForm = () => {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [secondLastName, setSecondLastName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const initialProfile = useRef({ name: "", lastName: "", secondLastName: "" });

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            const nextName = response.data?.name ?? "";
            const nextLastName = response.data?.last_name ?? "";
            const nextSecondLastName = response.data?.second_last_name ?? "";
            setName(nextName);
            setLastName(nextLastName);
            setSecondLastName(nextSecondLastName);
            initialProfile.current = {
                name: nextName,
                lastName: nextLastName,
                secondLastName: nextSecondLastName,
            };
            setHasError(false);
        } catch (err) {
            setHasError(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecover = async () => {
        setIsLoading(true);
        setHasError(false);
        await fetchProfile();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setShowSuccess(false);
        setShowError(false);

        try {
            const response = await updateProfile({ name, last_name:lastName, second_last_name:secondLastName });
            const nextName = response.data?.name ?? name;
            const nextLastName = response.data?.last_name ?? lastName;
            const nextSecondLastName = response.data?.second_last_name ?? secondLastName;
            setName(nextName);
            setLastName(nextLastName);
            setSecondLastName(nextSecondLastName);
            initialProfile.current = {
                name: nextName,
                lastName: nextLastName,
                secondLastName: nextSecondLastName,
            };
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            console.log(err);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        fetchProfile().catch(console.error);
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (hasError) {
        return <UnexpectedError onRetry={handleRecover} />;
    }

    const isDirty =
        name !== initialProfile.current.name ||
        lastName !== initialProfile.current.lastName ||
        secondLastName !== initialProfile.current.secondLastName;

    return (
        <div className="bg-white border border-gray-300 rounded-md w-full max-w-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md bg-gray-100 text-gray-600">
                    <FaUser className="text-lg" />
                </div>
                <div>
                    <h2 className="text-base text-gray-800 font-normal">Datos de la cuenta</h2>
                    <p className="text-sm text-gray-400">
                        Actualiza tu información.
                    </p>
                </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm text-gray-600">
                        Nombre
                    </label>
                    <input
                        id="name"
                        className={inputClassName}
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm text-gray-600">
                        Apellido Paterno
                    </label>
                    <input
                        id="lastName"
                        className={inputClassName}
                        type="text"
                        placeholder="Apellido Paterno"
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm text-gray-600">
                        Apellido Materno
                    </label>
                    <input
                        id="SecondLastName"
                        className={inputClassName}
                        type="text"
                        placeholder="Apellido Materno"
                        value={secondLastName}
                        required
                        onChange={(e) => setSecondLastName(e.target.value)}
                    />
                </div>

                <div className="pt-1">
                    <button
                        className="px-5 py-2.5 bg-black text-white rounded-md cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isSaving || !isDirty}
                    >
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </form>

            {showSuccess && (
                <div className="flex items-center gap-2 border border-green-300 rounded-md bg-green-50 mt-5 p-3">
                    <FaCheckCircle className="text-green-600 shrink-0" />
                    <p className="font-light text-sm text-green-700">
                        Perfil actualizado correctamente
                    </p>
                </div>
            )}

            {showError && (
                <div className="flex items-center gap-2 border border-red-300 rounded-md bg-red-50 mt-5 p-3">
                    <FaExclamationCircle className="text-red-600 shrink-0" />
                    <p className="font-light text-sm text-red-700">
                        No se pudo actualizar el perfil
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProfileForm;
