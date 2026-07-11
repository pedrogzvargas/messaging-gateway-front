import TicketList from "@/app/features/support/components/TicketList.tsx";
import { FaPlus } from "react-icons/fa";

const SupportPage = () => {
    return (
        <div className="mt-10">
            <div className="flex flex-col items-center">
                <div className="container flex justify-end mb-3">
                    <div className="flex items-center justify-center bg-black text-white h-10 w-30 text-lg rounded-md gap-1 cursor-pointer">
                        <p><FaPlus/></p>
                        <p className="flex items-center justify-center">Ticket</p>
                    </div>
                </div>
                <TicketList></TicketList>
            </div>
        </div>
    )
}

export default SupportPage;
