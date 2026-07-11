const TicketList = () => (
    <div className="container items-center justify-center">
        <div className="bg-white border border-gray-300 rounded-md p-3">
            <table className="border-separate border-spacing-y-0 table-auto w-full text-left">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Inconveniente</th>
                    <th>Fecha</th>
                </tr>
                </thead>
                <tbody>
                <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                    <td className="p-2 border-b border-gray-300">20e0019d</td>
                    <td className="border-b border-gray-300">No llegan los mensajes</td>
                    <td className="border-b border-gray-300">1961</td>
                </tr>
                <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                    <td className="p-2 border-b border-gray-300">ce805957</td>
                    <td className="border-b border-gray-300">Ya no tengo tokens</td>
                    <td className="border-b border-gray-300">1961</td>
                </tr>
                <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                    <td className="p-2 border-b border-gray-300">83273acc</td>
                    <td className="border-b border-gray-300">No puedo pagar</td>
                    <td className="border-b border-gray-300">1961</td>
                </tr>
                <tr className="transition-colors hover:bg-gray-100 cursor-pointer">
                    <td className="p-2 border-b border-gray-300">e21a6838</td>
                    <td className="border-b border-gray-300">Quiero hablar con un asesor</td>
                    <td className="border-b border-gray-300">1961</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
)

export default TicketList
