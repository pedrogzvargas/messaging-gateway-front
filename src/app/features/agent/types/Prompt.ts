export type PromptRole = "system" | "user" | "assistant";

export interface Prompt {
    id: string;
    business_id: string;
    key: string;
    description: string;
    content: string;
    role: PromptRole;
}

export type UpdatePromptParams = Pick<Prompt, "description" | "content">;
