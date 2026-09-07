import type { Channel } from "@/app/features/channels/types/Channel.ts";


const ChannelItem = ({id, channel, business, provider_id, display_name, created_at}: Channel ) => {
    function formatDate(date: string) {
        return new Intl.DateTimeFormat('es-MX', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(date))
    }

    return (
        <tr className="hover:bg-gray-100 cursor-default text-gray-500 font-light" key={id}>
            <td className="h-10 border-b border-gray-300 px-4">{id.split('-')[0]}</td>
            <td className="border-b border-gray-300">{channel}</td>
            <td className="border-b border-gray-300">{business}</td>
            <td className="border-b border-gray-300">{provider_id}</td>
            <td className="border-b border-gray-300">{display_name}</td>
            <td className="border-b border-gray-300">{formatDate(created_at)}</td>
        </tr>
    )
}

export default ChannelItem;
