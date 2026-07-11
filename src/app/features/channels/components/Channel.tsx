import {useState} from "react";
import ConversationList from "@/app/features/conversations/components/ConversationList.tsx";
import ContactList from "@/app/features/contacts/components/ContactList.tsx";

const Channel = () => {
    const tabs = [
        { id: "conversations", label: "Conversaciones" },
        { id: "contacts", label: "Contactos" },
    ];
    const [activeTab, setActiveTab] = useState("conversations");
     return (
         <div className="container w-full">
             <div className="border-b border-gray-200">
                 <nav className="flex gap-6">
                     {tabs.map((tab) => (
                         <button
                             key={tab.id}
                             onClick={() => setActiveTab(tab.id)}
                             className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                                 activeTab === tab.id
                                     ? "border-black text-black"
                                     : "border-transparent text-gray-500 hover:text-gray-700"
                             }`}
                         >
                             {tab.label}
                         </button>
                     ))}
                 </nav>
             </div>

             <div className="mt-6">
                 {activeTab === "conversations" && <div><ConversationList /></div>}
                 {activeTab === "contacts" && <div><ContactList /></div>}
             </div>
         </div>
     )
}

export default Channel;
