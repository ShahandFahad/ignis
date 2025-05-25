import { Request, Response } from "express";
import { handleUserMessage } from "../services/chat.service";

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
