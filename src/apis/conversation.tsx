import { AddConversationProps, Conversation } from "../interfaces/conversation";

export const AddConversation = async ({ username }: AddConversationProps): Promise<Conversation> => {
    const newConversation = {
        username: username,
    };

    try {
        const response = await fetch("/conversation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("auth-token") || "",
            },
            body: JSON.stringify(newConversation),
        })

        if (response.ok) {
            const data = await response.json();
            return data.conversation as Conversation;
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData);
        }
    } catch (error) {
        return Promise.reject("Error creating conversation");
    }
};

export const FetchConversations = async (): Promise<Conversation[]> => {

    try {
        const response = await fetch("/conversation", {
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("auth-token") || "",
            },
        })

        if (response.ok) {
            const data = await response.json();
            return data.conversations as Conversation[];
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData);
        }
    } catch (error) {
        return Promise.reject("Error fetching conversation");
    }
};