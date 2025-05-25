import Message from '../models/message.model';


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
    const botReply = generateBotReply(message);

    // Save to DB
    const chat = await Message.create({
        user,
        message,
        response: botReply,
    });

    return chat;
};


export const getUserChatHistory = async (user: string) => {
    return Message.find({ user }).sort({ createdAt: -1 });
}
