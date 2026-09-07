export type MessageRole = "assistant" | "user";
export type MessageDirection = "inbound" | "outbound";

export interface Message {
    id: string;
    conversation_id: string;
    role: MessageRole;
    message_id: string;
    message_type: string;
    message: string;
    direction: MessageDirection;
    timestamp: string;
    payload: Record<string, unknown>;
}
