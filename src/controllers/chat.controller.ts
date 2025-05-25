import { Request, Response } from "express";
import { getUserChatHistory, handleUserMessage } from "../services/chat.service";
import { MessageSchema } from "../validators/chat.validator";

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const parseResult = MessageSchema.safeParse(req.body);


        if (!parseResult.success) {
            const errors = parseResult.error.errors.map((e) => e.message);
            return res.status(400).json({ errors });
        }


        const { user, message } = parseResult.data; 


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
