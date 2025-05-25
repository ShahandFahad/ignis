import { Request, Response } from "express";
import { getUserChatHistory, handleUserMessage } from "../services/chat.service";

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user, message } = req.body;

        if (!user || !message) {
            return res.status(200).json({ error: 'user and message are required' });
        }

        const chat = await handleUserMessage(user, message);

        return res.status(200).json(chat);
    } catch (error) {
        console.log(`Error in sendMessage: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getHistory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const history = await getUserChatHistory(username);

        return res.status(200).json(history);
    } catch (error) {
        console.log(`Error in getHistory: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
