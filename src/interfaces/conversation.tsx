export interface Conversation {
    id: string;
    contactId: string;
    contactName: string;
    lastMessage: string;
}

export interface AddConversationProps {
    username: string;
}