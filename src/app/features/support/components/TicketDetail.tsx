import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import type { Ticket, TicketStatus } from "@/app/features/support/types/Ticket.ts";
import { closeTicket, getTicket } from "@/app/features/support/services/ticket.ts";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";

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

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));

const TicketDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [closeError, setCloseError] = useState(false);

    const fetchTicket = async (ticketId: string) => {
        try {
            const response = await getTicket(ticketId);
            setTicket(response.data);
        } catch (err) {
            setHasError(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecover = async () => {
        if (!id) return;
        setIsLoading(true);
        setHasError(false);
        await fetchTicket(id);
    };

    const handleCloseTicket = async () => {
        if (!ticket || ticket.status === "closed") return;

        setIsClosing(true);
        setCloseError(false);
        try {
            await closeTicket(ticket.id);
            const response = await getTicket(ticket.id);
            setTicket(response.data);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            setCloseError(true);
            console.log(err);
        } finally {
            setIsClosing(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        setHasError(false);
        fetchTicket(id).catch(console.error);
    }, [id]);

    if (isLoading) {
        return (
            <div className="container flex flex-col items-center w-full">
                <Spinner />
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="container flex flex-col w-full">
                <button
                    type="button"
                    onClick={() => navigate("/support")}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-3 cursor-pointer"
                >
                    <FaArrowLeft />
                    <span className="text-sm">Volver a soporte</span>
                </button>
                <UnexpectedError onRetry={handleRecover} />
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="container flex flex-col w-full">
                <button
                    type="button"
                    onClick={() => navigate("/support")}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-3 cursor-pointer"
                >
                    <FaArrowLeft />
                    <span className="text-sm">Volver a soporte</span>
                </button>
                <ResultsNotFund subtitle="No pudimos encontrar el ticket" />
            </div>
        );
    }

    const isClosed = ticket.status === "closed";

    return (
        <div className="container flex flex-col h-full min-h-0 overflow-hidden w-full">
            <div className="shrink-0 mb-4">
                <button
                    type="button"
                    onClick={() => navigate("/support")}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-3 cursor-pointer"
                >
                    <FaArrowLeft />
                    <span className="text-sm">Volver a soporte</span>
                </button>

                <div className="bg-white border border-gray-300 rounded-md p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <h1 className="font-normal text-lg text-gray-700">{ticket.id.split("-")[0]}</h1>
                        <span
                            className={`inline-block self-start px-2 py-0.5 text-xs rounded-md ${statusClass[ticket.status]}`}
                        >
                            {statusLabel[ticket.status]}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-500 mb-4">
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Id</p>
                            <p>{ticket.id}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Creado</p>
                            <p>{formatDate(ticket.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-0.5">Actualizado</p>
                            <p>{formatDate(ticket.updated_at)}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-400 text-xs mb-1">Descripción</p>
                        <p className="text-sm text-gray-600 font-light whitespace-pre-wrap">
                            {ticket.details}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-md p-4 max-w-xl">
                <h2 className="font-normal text-base text-gray-600 mb-1">Estado del ticket</h2>
                <p className="text-sm text-gray-400 mb-4">
                    Si tu problema se ha resuelto por favor marca el ticket como cerrado.
                </p>

                <button
                    type="button"
                    onClick={handleCloseTicket}
                    disabled={isClosed || isClosing}
                    className="px-4 py-2 bg-black text-white rounded-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isClosed ? "Ticket cerrado" : isClosing ? "Cerrando..." : "Cerrar ticket"}
                </button>

                {showSuccess && (
                    <div className="mt-3 rounded-sm border border-green-200 bg-green-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600 text-xs shrink-0" />
                            <p className="text-xs text-green-800 font-light leading-snug">
                                El ticket se cerró correctamente
                            </p>
                        </div>
                    </div>
                )}

                {closeError && !showSuccess && (
                    <div className="mt-3 rounded-sm border border-red-200 bg-red-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <FaExclamationCircle className="text-red-600 text-xs shrink-0" />
                            <p className="text-xs text-red-800 font-light leading-snug">
                                No se pudo cerrar el ticket. Intenta de nuevo.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetail;
