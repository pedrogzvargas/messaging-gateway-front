import type {Faq, FaqStatus} from "@/app/features/agent/types/Faq.ts";

type FaqItemProps = Faq & { onClick: () => void };

const statusLabel: Record<FaqStatus, string> = {
    active: "Activo",
    inactive: "Inactivo",
};

const statusClass: Record<FaqStatus, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-500",
};
const FaqItem = ({ id, question, answer, is_active, created_at, onClick }: FaqItemProps) => {
    function formatDate(date: string) {
        return new Intl.DateTimeFormat("es-MX", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(date));
    }

    return (
        <tr
            className="transition-colors hover:bg-gray-100 cursor-pointer text-gray-500 font-light"
            onClick={onClick}
        >
            <td className="h-10 border-b border-gray-300 px-4">{id.split("-")[0]}</td>
            <td className="border-b border-gray-300 max-w-xs truncate pr-4" title={question}>
                {question}
            </td>
            <td className="border-b border-gray-300 max-w-sm truncate pr-4" title={answer}>
                {answer}
            </td>
            <td className="border-b border-gray-300 max-w-sm truncate pr-4">
                <span className={`inline-block px-2 py-0.5 text-xs rounded-md ${statusClass[is_active ? "active" : "inactive"]}`}>
                    {statusLabel[is_active ? "active" : "inactive"]}
                </span>
            </td>
            <td className="border-b border-gray-300 whitespace-nowrap">{formatDate(created_at)}</td>
        </tr>
    );
};

export default FaqItem;
