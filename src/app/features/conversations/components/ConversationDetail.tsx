import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { Conversation } from "@/app/features/conversations/types/Conversation.ts";
import type { Message } from "@/app/features/conversations/types/Message.ts";
import { getConversationMessages } from "@/app/features/conversations/services/conversation.ts";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));

const formatTime = (date: string) =>
    new Intl.DateTimeFormat("es-MX", {
        timeStyle: "short",
    }).format(new Date(date));

const ConversationDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [conversation, setConversation] = useState<Conversation | undefined>(undefined);
    const [messages, setMessages] = useState<Message[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchDetail = async (conversationId: string) => {
        try {
            const response = await getConversationMessages(conversationId);

            if (!response.data) {
                setHasError(true);
                return;
            }

            setConversation(response.data.conversation);
            setMessages(response.data.messages);
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
        await fetchDetail(id);
    };

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        setHasError(false);
        fetchDetail(id).catch(console.error);
    }, [id]);

    return (
        <div className="container flex flex-col h-full min-h-0 overflow-hidden w-full">
            <div className="shrink-0 mb-4">
                <button
                    type="button"
                    onClick={() => navigate("/conversation")}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-3 cursor-pointer"
                >
                    <FaArrowLeft />
                    <span className="text-sm">Volver a conversaciones</span>
                </button>

                {conversation && !isLoading && !hasError && (
                    <div className="bg-white border border-gray-300 rounded-md p-4">
                        <h1 className="font-normal text-lg text-gray-700 mb-3">
                            {conversation.display_name}
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-500">
                            <div>
                                <p className="text-gray-400 text-xs mb-0.5">Id</p>
                                <p>{conversation.id.split("-")[0]}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-0.5">Canal</p>
                                <p>{conversation.channel}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-0.5">Contacto</p>
                                <p>{conversation.provider_id}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-0.5">Creado</p>
                                <p>{formatDate(conversation.created_at)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center">
                {isLoading && <Spinner />}
            </div>

            {hasError && !isLoading && <UnexpectedError onRetry={handleRecover} />}

            {!isLoading && !hasError && messages !== undefined && messages.length === 0 && (
                <ResultsNotFund subtitle="No pudimos encontrar mensajes" />
            )}

            {!isLoading && !hasError && messages !== undefined && messages.length > 0 && (
                <div className="flex flex-col flex-1 min-h-0 bg-white border border-gray-300 rounded-md overflow-hidden">
                    <div className="shrink-0 border-b border-gray-200 px-4 py-3">
                        <h2 className="font-normal text-base text-gray-600">Mensajes</h2>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
                        {messages.map((message) => {
                            const isAgent = message.direction === "outbound";

                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] sm:max-w-[65%] rounded-md px-3 py-2 ${
                                            isAgent
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        <p className={`text-xs mb-1 ${isAgent ? "text-gray-300" : "text-gray-400"}`}>
                                            {isAgent ? "Agente" : "Cliente"}
                                        </p>
                                        <p className="text-sm font-light whitespace-pre-wrap">
                                            {message.message}
                                        </p>
                                        <p className={`text-xs mt-1 text-right text-gray-400`}>
                                            {formatTime(message.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConversationDetail;
