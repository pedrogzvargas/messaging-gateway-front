export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
    id: string;
    details: string;
    status: TicketStatus;
    created_at: string;
    updated_at: string;
}

export type CreateTicketParams = {
    id: string;
    details: string;
};
