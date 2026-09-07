import FaqItem from "@/app/features/agent/components/FaqItem.tsx";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import type { Faq, UpdateFaqParams } from "@/app/features/agent/types/Faq.ts";
import { createFaq, getFaqs, updateFaq } from "@/app/features/agent/services/agent.ts";
import Spinner from "@/shared/components/Spinner.tsx";
import UnexpectedError from "@/shared/components/UnexpectedError";
import ResultsNotFund from "@/shared/components/ResultsNotFund.tsx";
import Paginator from "@/shared/components/Paginator.tsx";
import FaqEditModal, { type FaqModalState } from "@/app/features/agent/components/FaqEditModal.tsx";

const FaqList = () => {
    const [faqsList, setFaqsList] = useState<Faq[] | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [modalState, setModalState] = useState<FaqModalState>(null);

    const fetchFaqs = async (page: number, name?: string) => {
        try {
            const response = await getFaqs({ page, name });
            setFaqsList(response.results);
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
        await fetchFaqs(page);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage === page) return;
        setIsLoading(true);
        setPage(newPage);
    };

    const handleSaveFaq = async (payload: UpdateFaqParams) => {
        if (modalState?.mode === "edit") {
            await updateFaq(modalState.faq.id, payload);
        } else {
            await createFaq({ id: crypto.randomUUID(), ...payload });
        }
        await fetchFaqs(page);
    };

    useEffect(() => {
        fetchFaqs(page).catch(console.error);
    }, [page]);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex justify-end mb-4">
                <button
                    type="button"
                    onClick={() => setModalState({ mode: "create" })}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md cursor-pointer transition-colors hover:bg-gray-800"
                >
                    <FaPlus className="text-xs" />
                    Nueva FAQ
                </button>
            </div>

            {isLoading && <Spinner />}

            {!isLoading && !hasError && (faqsList?.length ?? 0) > 0 && (
                <div className="bg-white border border-gray-300 rounded-md w-full overflow-x-auto">
                    <table className="w-full min-w-175 text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="font-normal text-gray-600 px-4 py-3">Id</th>
                                <th className="font-normal text-gray-600">Pregunta</th>
                                <th className="font-normal text-gray-600">Respuesta</th>
                                <th className="font-normal text-gray-600">Estatus</th>
                                <th className="font-normal text-gray-600">Creado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqsList?.map((faq) => (
                                <FaqItem
                                    key={faq.id}
                                    id={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                    is_active={faq.is_active}
                                    created_at={faq.created_at}
                                    updated_at={faq.updated_at}
                                    onClick={() => setModalState({ mode: "edit", faq })}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!isLoading && !hasError && faqsList !== undefined && faqsList.length > 0 && (
                <Paginator
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {hasError && !isLoading && <UnexpectedError onRetry={handleRecover} />}
            {faqsList !== undefined && faqsList.length === 0 && !isLoading && (
                <ResultsNotFund subtitle="No pudimos encontrar FAQs" />
            )}

            <FaqEditModal
                state={modalState}
                onClose={() => setModalState(null)}
                onSave={handleSaveFaq}
            />
        </div>
    );
};

export default FaqList;
