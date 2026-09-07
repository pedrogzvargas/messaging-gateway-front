export interface Faq {
    id: string;
    question: string;
    answer: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export type CreateFaqParams = Pick<Faq, "id" | "question" | "answer" | "is_active">;

export type UpdateFaqParams = Pick<Faq, "question" | "answer" | "is_active">;

export type FaqStatus = 'active' | 'inactive';