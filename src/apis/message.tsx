import { Message } from "../interfaces/message";

export const SendMessage = async (newMessage: Message): Promise<Message> => {
    try {
        const response = await fetch("/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("auth-token") || "",
            },
            body: JSON.stringify(newMessage),
        })

        if (response.ok) {
            const data = await response.json();
            return data.message as Message;
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData);
        }
    } catch (error) {
        return Promise.reject("Error sending message");
    }
};

export const FetchMessages = async (conversationId: string): Promise<Message[]> => {
    try {
        const response = await fetch(`/message?conversationId=${conversationId}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("auth-token") || "",
            },
        })

        if (response.ok) {
            const data = await response.json();
            return data.messages as Message[];
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData);
        }
    } catch (error) {
        return Promise.reject("Error sending message");
    }
};