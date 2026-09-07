import { useEffect, useState } from "react";
import type { Ticket } from "@/app/features/support/types/Ticket.ts";
import { getTickets } from "@/app/features/support/services/ticket.ts";
import TicketItem from "@/app/features/support/components/TicketItem.tsx";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";
import Paginator from "@/shared/components/Paginator.tsx";

const TicketList = () => {
    const [ticketsList, setTicketsList] = useState<Ticket[] | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    const fetchTickets = async (page: number, name?: string) => {
        try {
            const response = await getTickets({ page, name });
            setTicketsList(response.results);
            setTotalPages(response.pages);
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
        await fetchTickets(page);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage === page) return;
        setIsLoading(true);
        setPage(newPage);
    };

    useEffect(() => {
        fetchTickets(page).catch(console.error);
    }, [page]);

    return (
        <div className="container flex flex-col items-center justify-center w-full">
            {isLoading && <Spinner />}

            {!isLoading && !hasError && (ticketsList?.length ?? 0) > 0 && (
                <div className="bg-white border border-gray-300 rounded-md w-full">
                    <table className="border-collapse table-auto w-full text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="font-normal text-gray-600 px-4 py-3">Id</th>
                                <th className="font-normal text-gray-600">Detalle</th>
                                <th className="font-normal text-gray-600">Estado</th>
                                <th className="font-normal text-gray-600">Creado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketsList?.map((ticket) => (
                                <TicketItem
                                    key={ticket.id}
                                    id={ticket.id}
                                    details={ticket.details}
                                    status={ticket.status}
                                    created_at={ticket.created_at}
                                    updated_at={ticket.updated_at}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!isLoading && !hasError && ticketsList !== undefined && ticketsList.length > 0 && (
                <Paginator
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {hasError && !isLoading && <UnexpectedError onRetry={handleRecover} />}
            {ticketsList !== undefined && ticketsList.length === 0 && !isLoading && (
                <ResultsNotFund subtitle="No pudimos encontrar tickets" />
            )}
        </div>
    );
};

export default TicketList;
