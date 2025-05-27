import OpenAI from 'openai';
import Message from '../models/message.model';
import openai from '../config/openai';

// TEMP - Reply Function
export const generateBotReply = (input: string): string => {
    const cleaned = input.trim().toLowerCase();

    if (cleaned.includes('hello') || cleaned.includes('hi')) {
        return 'Hi there! How can I help you today?';
    } else if (cleaned.includes('bye')) {
        return 'Goodbye! Have a great day!';
    } else {
        return "I'm just a simple bot. Can you rephrase that?";
    }
};



export const handleUserMessage = async (user: string, message: string) => {
    // const botReply = generateBotReply(message);

    // generate replies
    const aiReply = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message },
        ],
    });

    // pick reply via index
    const reply = aiReply.choices[0]?.message.content || 'Sorry, I had trouble replying.';

    // Save to DB
    const newMessage = await Message.create({
        user,
        message,
        reply,
    });

    return newMessage;

    /*
    const chat = await Message.create({
        user,
        message,
        response: botReply,
    });

    return chat;
    */
};


export const getUserChatHistory = async (user: string) => {
    return Message.find({ user }).sort({ createdAt: -1 });
}
