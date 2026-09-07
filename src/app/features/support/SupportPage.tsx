import { useState } from "react";
import TicketList from "@/app/features/support/components/TicketList.tsx";
import TicketCreateModal from "@/app/features/support/components/TicketCreateModal.tsx";
import { createTicket } from "@/app/features/support/services/ticket.ts";
import { FaPlus } from "react-icons/fa";

const SupportPage = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [listKey, setListKey] = useState(0);

    const handleCreateTicket = async (details: string) => {
        await createTicket({ id: crypto.randomUUID(), details });
        setListKey((current) => current + 1);
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="container flex flex-col items-center justify-center w-full px-4">
                <div className="w-full mb-3">
                    <h1 className="font-normal text-lg pl-5 text-gray-600">Soporte</h1>
                </div>
                <div className="container flex justify-end mb-4">
                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center justify-center bg-black text-white h-10 px-4 text-lg rounded-md gap-1 cursor-pointer"
                    >
                        <FaPlus />
                        <span>Ticket</span>
                    </button>
                </div>
                <TicketList key={listKey} />
            </div>

            <TicketCreateModal
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateTicket}
            />
        </div>
    );
};

export default SupportPage;
