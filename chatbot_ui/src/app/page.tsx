import ChatBox from "@/components/ChatBox";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-md sm:max-w-xl">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Chatbot UI</h1>
                <ChatBox />
            </div>
        </main>
    )
}
