import { FaRegCalendarAlt, FaCheck, FaPhone, FaChartLine, FaChartBar, FaRobot } from "react-icons/fa";
import {usePushNotifications} from "@/shared/hooks/usePushNotifications.ts";

const Dashboard = () => {
    const { subscribe } = usePushNotifications();

    return (
        <div className="container">
            <div className="mt-10 text-lg text-gray-500">
                <p>Bienvenido de vuelta, Pedro González</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-3 gap-1 justify-items-center">
                <div className="bg-white border border-gray-300 w-[95%] sm:w-full rounded-md h-30 cursor-default">
                    <p className="text-gray-500 p-3 font-light">Conversaciones de hoy</p>
                    <div className="flex items-center w-full justify-between p-3">
                        <p className="text-gray-500 sm:text-3xl text-2xl">10</p>
                        <p className="text-3xl text-gray-500"><FaRegCalendarAlt/></p>
                    </div>
                </div>
                <div className="bg-white border border-gray-300 w-[95%] sm:w-full rounded-md h-30 cursor-default">
                    <p className="text-gray-500 p-3 font-light">Total de conversaciones</p>
                    <div className="flex items-center w-full justify-between p-3">
                        <p className="text-gray-500 sm:text-3xl text-2xl">50</p>
                        <p className="text-3xl text-green-500"><FaCheck/></p>
                    </div>
                </div>
                <div className="bg-white border border-gray-300 w-[95%] sm:w-full rounded-md h-30 cursor-default">
                    <p className="text-gray-500 p-3 font-light">Mi número</p>
                    <div className="flex items-center w-full justify-between p-3">
                        <p className="text-gray-500 sm:text-3xl text-2xl">7461104241</p>
                        <p className="text-3xl text-gray-500"><FaPhone/></p>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-lg text-gray-500">
                <p>Consumo de tokens</p>
            </div>
            <div className="flex mt-3 bg-white border border-gray-300 rounded-md cursor-default">
                <div className="w-1/3 h-30">
                    <p className="text-gray-500 p-3 font-light">Tokens consumidos</p>
                    <div className="flex items-center w-full justify-between p-3">
                        <p className="text-gray-500 sm:text-3xl text-md">35K</p>
                        <p className="text-3xl text-blue-500"><FaChartLine/></p>
                    </div>
                </div>
                <div className="w-1/3 h-30">
                    <p className="text-gray-500 p-3 font-light">Tokens disponibles</p>
                    <div className="flex items-center w-full justify-between p-3">
                        <p className="text-gray-500 sm:text-3xl text-md">350K</p>
                        <p className="text-3xl text-green-500"><FaChartBar/></p>
                    </div>
                </div>
                <div className="w-1/3 h-30">
                    <p className="text-gray-500 p-3 font-light">Modelo</p>
                    <div className="flex items-center w-full justify-between p-3">
                        <p className="text-gray-500 sm:text-3xl text-md">GPT-4o-mini</p>
                        <p className="text-3xl text-gray-500"><FaRobot/></p>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-lg text-gray-500">
                <p>Mensajes por responder</p>
            </div>
            <div className="mt-3 bg-white border border-gray-300 rounded-md p-3">
                <table className="border-separate border-spacing-y-0 table-auto w-full text-left">
                    <thead>
                    <tr>
                        <th>Número</th>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                        <td className="p-2 border-b border-gray-300">7461093454</td>
                        <td className="border-b border-gray-300">Quiero hablar con un asesor</td>
                        <td className="border-b border-gray-300">1961</td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                        <td className="p-2 border-b border-gray-300">7461093454</td>
                        <td className="border-b border-gray-300">Quiero hablar con un asesor</td>
                        <td className="border-b border-gray-300">1961</td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                        <td className="p-2 border-b border-gray-300">7461093454</td>
                        <td className="border-b border-gray-300">Quiero hablar con un asesor</td>
                        <td className="border-b border-gray-300">1961</td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                        <td className="p-2 border-b border-gray-300">7461093454</td>
                        <td className="border-b border-gray-300">Quiero hablar con un asesor</td>
                        <td className="border-b border-gray-300">1961</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-black text-white rounded-md h-10 w-40" onClick={subscribe}>
                <p>
                    Activar notificaciones
                </p>
            </div>
        </div>
    )
}

export default Dashboard
