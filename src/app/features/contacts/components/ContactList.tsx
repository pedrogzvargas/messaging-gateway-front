import ContactItem from "@/app/features/contacts/components/ContactItem.tsx";
import {useEffect, useState} from "react";
import type {Contact} from "@/app/features/contacts/types/Contact.ts";
import {getContacts} from "@/app/features/contacts/services/contact.ts";

const ContactList = () => {
    const [contactsList, setContactsList] = useState<Contact[]>([])
    const [page, ] = useState(1);

    const fetchContacts = async (page: number, name?: string) => {
        try {
            const response = await getContacts({page, name});
            setContactsList(response.results);
            console.log(response);
        } catch (err) {
            console.log(err);
        } finally {
            console.log("Error")
        }
    };
    useEffect(() => {
        try {
            fetchContacts(page).catch(console.error);
        } finally {
            console.log("Error")
        }
    }, [page]);

    return (
        <div className="container items-center justify-center">
            <div className="w-full mb-3">
                <h1 className="font-normal text-lg pl-5 text-gray-600">Contactos</h1>
            </div>
            <div className="bg-white border border-gray-300 rounded-md">
                <table className="border-collapse table-auto w-full text-left">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="font-normal text-black px-4 py-3">Id</th>
                        <th className="font-normal text-black">Origen</th>
                        <th className="font-normal text-black">Contacto</th>
                        <th className="font-normal text-black">Display name</th>
                        <th className="font-normal text-black">Creado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contactsList.map(contact => (
                        <ContactItem
                            key={contact.id}
                            id={contact.id}
                            channel={contact.channel}
                            provider_id={contact.provider_id}
                            display_name={contact.display_name}
                            created_at={contact.created_at}
                            updated_at={contact.updated_at}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ContactList
