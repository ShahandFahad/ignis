'use client'

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ChatBox = () => {
    // TODO: get user after login from local storage
    const [user, setUser] = useState('Default');
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // send message
    const sendMessage = async () => {
        if (!message) return;

        try {
            setLoading(true);
            setError('');

            const res = await fetch('/api/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, message }),
            });

            // get data and set the chatLog
            const data = await res.json();
            setChatLog((prev) => [...prev, `You: ${message}`, `Bot: ${data?.reply.response}`]);
            setMessage('');
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.log(`ChatBox Err: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="border rounded-md p-4 h-64 overflow-y-auto bg-muted">
                {
                    chatLog.map((msg, i) => (
                        <p key={i} className="text-sm">
                            {msg}
                        </p>
                    ))
                }
            </div>
            <div className="flex gap-2">
                <Input
                    placeholder="Ask something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button onClick={sendMessage} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </div>
    );
}


export default ChatBox;
