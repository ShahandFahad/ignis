'use client'
import ChatBox from "@/components/ChatBox";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
    const { user } = useAuth();
    return (
        <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-md sm:max-w-xl">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">👋, {user?.username}</h1>
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Welcome To AI Assistant - 🤖</h1>
                <ChatBox />
            </div>
        </main>
    )
}
