import type { Ticket, TicketStatus } from "@/app/features/support/types/Ticket.ts";
import { useNavigate } from "react-router-dom";

const statusLabel: Record<TicketStatus, string> = {
    open: "Abierto",
    in_progress: "En progreso",
    closed: "Cerrado",
};

const statusClass: Record<TicketStatus, string> = {
    open: "bg-blue-100 text-blue-700",
    in_progress: "bg-amber-100 text-amber-700",
    closed: "bg-gray-100 text-gray-500",
};

const TicketItem = ({ id, details, status, created_at }: Ticket) => {
    const navigate = useNavigate();

    function formatDate(date: string) {
        return new Intl.DateTimeFormat("es-MX", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(date));
    }

    const handleClick = () => {
        navigate(`/support/${id}`);
    };

    return (
        <tr
            className="transition-colors hover:bg-gray-100 cursor-pointer text-gray-500 font-light"
            onClick={handleClick}
        >
            <td className="h-10 border-b border-gray-300 px-4">{id.split("-")[0]}</td>
            <td className="border-b border-gray-300 max-w-xs truncate pr-4" title={details}>
                {details}
            </td>
            <td className="border-b border-gray-300">
                <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-md ${statusClass[status]}`}
                >
                    {statusLabel[status]}
                </span>
            </td>
            <td className="border-b border-gray-300">{formatDate(created_at)}</td>
        </tr>
    );
};

export default TicketItem;
