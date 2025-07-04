'use client'

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth-context";

type Message = {
    role: 'user' | 'bot';
    text: string;
};

const ChatBox = () => {
    // const [user, setUser] = useState('');
    const { user, isUserLoggedIn, logout } = useAuth();
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        /*
        // got user from local storage instead of using this
        // get user from local storage
        const id = localStorage.getItem('sessionId') || crypto.randomUUID()
        localStorage.setItem('sessionId', id);
        setUser(id);
        */

        if (user) {
            // Load chat history
            getMessages(user?.username as string);
        } else {
            // check user
            isUserLoggedIn();
        }

    }, [user]);

    // send message
    const sendMessage = async () => {
        if (!message) return;
        const username = user?.username;
        if (!username) return;


        try {
            setLoading(true);
            setError('');

            // send post request to api
            const res = await fetch('/api/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, message }),
            });

            // get data and set the chatLog
            const data = await res.json();
            setChatLog((prev) => [...prev, data.reply]);
            /*
            setChatLog((prev) => [
                ...prev,
                { role: 'user', text: message },
                { role: 'bot', text: data?.reply.response },
            ]);
            */
            setMessage('');
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.log(`ChatBox Err: ${error}`);
        } finally {
            setLoading(false);
        }
    }



    // get messages
    const getMessages = async (username: string) => {
        if (!username) return;

        try {
            setLoading(true);
            setError('');

            const res = await fetch(`/api/message/${username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            // get data and set the chatLog
            const data = await res.json();
            /*

            setChatLog((prev) => [
                ...prev,
                { role: 'user', text: data?.chamessage },
                { role: 'bot', text: data?.chats.response },
            ]);
            */

            // set chat log
            setChatLog((prev) => [...prev, ...data.chats]);
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
                    /*
                        chatLog.map((msg, i) => (
                            <p key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                            <span className="inline-block px-3 py-1 rounded bg-muted">
                            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                            </span>
                            </p>
                    ))
                    */

                    // iterate over chats
                    // @tsx-ignore
                    chatLog.map((msg, i) => (
                        <div key={i}>
                            <p className="text-right">
                                <span className="inline-block px-3 py-1 rounded bg-muted">
                                    <strong>You:</strong>
                                    {msg.message}
                                </span>
                            </p>
                            <p className="text-left">
                                <span className="inline-block px-3 py-1 rounded bg-muted">
                                    <strong>Bot:</strong>
                                    {msg.response}
                                </span>
                            </p>
                        </div>
                    ))
                }

            </div>
            <div className="flex gap-2 m-1">
                <Button onClick={logout} className="bg-red-500 hover:bg-red-600 cursor-pointer">
                    Logout
                </Button>
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
