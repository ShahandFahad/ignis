import ChatBox from "@/components/ChatBox";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center p-8">
            <div className="max-w-xl w-full">
                <h1 className="text-2xl font-bold mb-4"></h1>
                <ChatBox />
            </div>
        </main>
    )
}
