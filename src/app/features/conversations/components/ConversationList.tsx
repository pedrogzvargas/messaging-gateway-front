import { getConversations } from "@/app/features/conversations/services/conversation.ts";
import type { Conversation } from "@/app/features/conversations/types/Conversation.ts";
import ConversationItem from "@/app/features/conversations/components/ConversationItem.tsx";
import { useEffect } from "react";
import { useState } from "react";

const ConversationList = () => {
    const [conversationsList, setConversationsList] = useState<Conversation[]>([])
    const [page, ] = useState(1);

    const fetchCustomers = async (page: number, name?: string) => {
        try {
            const response = await getConversations({page, name});
            setConversationsList(response.results);
            console.log(response);
        } catch (err) {
            console.log(err);
        } finally {
            console.log("Error")
        }
    };
     useEffect(() => {
         try {
            fetchCustomers(page).catch(console.error);
         } finally {
             console.log("Error")
         }
     }, [page]);

    return (
        <div className="container items-center justify-center">
            <div className="w-full mb-3">
                <h1 className="font-normal text-lg pl-5 text-gray-600">Conversaciones</h1>
            </div>
            <div className="bg-white border border-gray-300 rounded-md">
                <table className="border-collapse table-auto w-full text-left">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="font-normal text-black px-4 py-3">Id</th>
                        <th className="font-normal text-black">Canal</th>
                        <th className="font-normal text-black">Contacto</th>
                        <th className="font-normal text-black">Nombre</th>
                        <th className="font-normal text-black">Fecha creación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {conversationsList.map(conversation => (
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
        </div>
    )
}

export default ConversationList
