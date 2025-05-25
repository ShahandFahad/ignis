import { z } from 'zod';

export const MessageSchema = z.object({
    user: z
        .string()
        .min(1, 'User name is required')
        .max(50, 'Username too long'),
    message: z
        .string()
        .min(1, 'Message cannot be empty')
        .max(500, 'Message too long'),
});


export type MessageInput = z.infer<typeof MessageSchema>;
