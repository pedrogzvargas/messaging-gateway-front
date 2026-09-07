import type { Contact } from "@/app/features/contacts/types/Contact.ts";


const ContactItem = ({id, channel, provider_id, display_name, created_at}: Contact ) => {
    function formatDate(date: string) {
        return new Intl.DateTimeFormat('es-MX', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(date))
    }

    return (
        <tr className="transition-colors hover:bg-gray-100 cursor-default text-gray-500 font-light" key={id}>
            <td className="h-10 border-b border-gray-300 px-4">{id.split('-')[0]}</td>
            <td className="border-b border-gray-300">{channel}</td>
            <td className="border-b border-gray-300">{provider_id}</td>
            <td className="border-b border-gray-300">{display_name}</td>
            <td className="border-b border-gray-300">{formatDate(created_at)}</td>
        </tr>
    )
}

export default ContactItem;
