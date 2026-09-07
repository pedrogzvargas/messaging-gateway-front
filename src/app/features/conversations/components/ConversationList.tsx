import { getConversations } from "@/app/features/conversations/services/conversation.ts";
import type { Conversation } from "@/app/features/conversations/types/Conversation.ts";
import ConversationItem from "@/app/features/conversations/components/ConversationItem.tsx";
import { useEffect, useState } from "react";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";
import Paginator from "@/shared/components/Paginator.tsx";

const ConversationList = () => {
    const [conversationsList, setConversationsList] = useState<Conversation[] | undefined>(undefined)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false)

    const fetchConversations = async (page: number, name?: string) => {
        try {
            const response = await getConversations({page, name});
            setConversationsList(response.results);
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
        await fetchConversations(page)
    }

    const handlePageChange = (newPage: number) => {
        if (newPage === page) return;
        setIsLoading(true);
        setPage(newPage);
    };

    useEffect(() => {
        fetchConversations(page).catch(console.error);
    }, [page]);

    return (
        <div className="container flex flex-col items-center justify-center overflow-x-auto w-full">
            <div className="w-full mb-3">
                <h1 className="font-normal text-lg pl-5 text-gray-600">Conversaciones</h1>
            </div>
            { isLoading && <Spinner /> }

            {!isLoading && !hasError && (conversationsList?.length ?? 0) > 0 && <div className="bg-white border border-gray-300 rounded-md w-full overflow-x-auto">
                <table className="border-collapse table-auto w-full min-w-175 text-left">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="font-normal text-gray-600 px-4 py-3">Id</th>
                        <th className="font-normal text-gray-600">Canal</th>
                        <th className="font-normal text-gray-600">Contacto</th>
                        <th className="font-normal text-gray-600">Nombre</th>
                        <th className="font-normal text-gray-600">Fecha creación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {conversationsList?.map(conversation => (
                        <ConversationItem
                            key={conversation.id}
                            id={ conversation.id }
                            channel={ conversation.channel }
                            provider_id={ conversation.provider_id }
                            display_name={ conversation.display_name }
                            created_at={ conversation.created_at }
                            updated_at={ conversation.updated_at }
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            }

            {!isLoading && !hasError && conversationsList !== undefined && conversationsList.length > 0 && (
                <Paginator
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            { hasError && !isLoading && <UnexpectedError onRetry={handleRecover}/>}
            { conversationsList !== undefined && conversationsList.length === 0 && !isLoading && <ResultsNotFund subtitle="No pudimos encontrar conversaciones"/>}
        </div>
    )
}

export default ConversationList
