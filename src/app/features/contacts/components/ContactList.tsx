import ContactItem from "@/app/features/contacts/components/ContactItem.tsx";
import {useEffect, useState} from "react";
import type {Contact} from "@/app/features/contacts/types/Contact.ts";
import {getContacts} from "@/app/features/contacts/services/contact.ts";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";
import Paginator from "@/shared/components/Paginator.tsx";

const ContactList = () => {
    const [contactsList, setContactsList] = useState<Contact[] | undefined>(undefined)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false)

    const fetchContacts = async (page: number, name?: string) => {
        try {
            const response = await getContacts({page, name});
            setContactsList(response.results);
            setTotalPages(response.pages);
        } catch (err) {
            setHasError(true);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecover = async () => {
        setIsLoading(true);
        setHasError(false);
        await fetchContacts(page)
    }

    const handlePageChange = (newPage: number) => {
        if (newPage === page) return;
        setIsLoading(true);
        setPage(newPage);
    };

    useEffect(() => {
        fetchContacts(page).catch(console.error);
    }, [page]);

    return (
        <div className="container flex flex-col items-center justify-center w-full">
            <div className="w-full mb-3">
                <h1 className="font-normal text-lg pl-5 text-gray-600">Contactos</h1>
            </div>
            { isLoading && <Spinner /> }

            {!isLoading && !hasError && (contactsList?.length ?? 0) > 0 && <div className="bg-white border border-gray-300 rounded-md w-full">
                <table className="border-collapse table-auto w-full text-left">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="font-normal text-gray-600 px-4 py-3">Id</th>
                        <th className="font-normal text-gray-600">Origen</th>
                        <th className="font-normal text-gray-600">Contacto</th>
                        <th className="font-normal text-gray-600">Display name</th>
                        <th className="font-normal text-gray-600">Creado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contactsList?.map(contact => (
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
            }

            {!isLoading && !hasError && contactsList !== undefined && contactsList.length > 0 && (
                <Paginator
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            { hasError && !isLoading && <UnexpectedError onRetry={handleRecover}/>}
            { contactsList !== undefined && contactsList.length == 0 && !isLoading && <ResultsNotFund subtitle="No pudimos encontrar contactos"/>}
        </div>
    )
}

export default ContactList
