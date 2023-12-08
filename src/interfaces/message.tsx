export interface Message {
    id: string;
    conversationId: string;
    sender: string;
    content: string;
    timeSent: Date;
}

export interface MessagePackage {
    message: Message;
    conversationId: string;
}