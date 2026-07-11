import { FaUndo, FaExclamationTriangle } from "react-icons/fa";

interface Props {
    onRetry: () => void;
}

const UnexpectedError = ({ onRetry }: Props) => (
    <div className="flex flex-col items-center justify-center m-auto mt-14 space-y-2">
        <FaExclamationTriangle  className="text-gray-300 text-8xl"/>
        <p className="text-gray-300 text-3xl">Error inesperado</p>
        <p className="text-gray-300 text-sm">No se pudo cargar la información</p>
        <button onClick={onRetry} className="flex items-center bg-gray-300 text-white hover:bg-gray-400 text-sm rounded-sm p-1 gap-1">
            <FaUndo />
            Volver a intentarlo
        </button>
    </div>
)

export default UnexpectedError;
