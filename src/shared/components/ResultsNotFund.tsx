import { FaSearch } from "react-icons/fa";
import type { ReactNode } from "react";

interface Props {
    title?: string;
    subtitle?: string;
    children?: ReactNode;
}

const ResultsNotFund = ({title = "Resultados no encontrados", subtitle = "No pudimos encontrar elementos" , children }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center m-auto mt-14 space-y-2">
            <FaSearch  className="text-gray-300 text-8xl"/>
            <p className="text-gray-300 text-3xl">{ title }</p>
            <p className="text-gray-300 text-sm">{ subtitle }</p>
            { children }
            {/*<button onClick={handleSearchInputReset} className="flex items-center bg-gray-300 text-white hover:bg-gray-400 text-sm rounded-sm p-1 gap-1">*/}
            {/*    <FaUndo />*/}
            {/*    Resetear filtro*/}
            {/*</button>*/}
        </div>
    )
}

export default ResultsNotFund;
