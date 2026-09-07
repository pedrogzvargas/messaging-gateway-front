import type { Conversation } from "@/app/features/conversations/types/Conversation.ts";
import { useNavigate } from "react-router-dom";

const ConversationItem = ({id, channel, provider_id, display_name, created_at, updated_at}: Conversation ) => {
    const navigate = useNavigate();

    function formatDate(date: string) {
        return new Intl.DateTimeFormat('es-MX', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(date))
    }

    const handleClick = () => {
        navigate(`/conversation/${id}`, {
            state: { id, channel, provider_id, display_name, created_at, updated_at },
        });
    }

    return (
        <tr
            className="hover:bg-gray-100 cursor-pointer text-gray-500 font-light"
            key={id}
            onClick={handleClick}
        >
            <td className="h-10 border-b border-gray-300 px-4">{id.split('-')[0]}</td>
            <td className="border-b border-gray-300">{channel}</td>
            <td className="border-b border-gray-300">{provider_id}</td>
            <td className="border-b border-gray-300">{display_name}</td>
            <td className="border-b border-gray-300">{formatDate(created_at)}</td>
        </tr>
    )
}

export default ConversationItem;
