import { NextRequest, NextResponse } from "next/server";

// Make a GET request to server: get chat histroy
export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    // get user name from next.js request
    const { id } = await params;
    const username: string = id;


    // send GET request to ser
    try {
        // get request for chat histroy
        const res = await fetch(`${process.env.SERVER_URI}/api/chat/history/${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        // get chat history
        const chatHistory = await res.json();
        console.log("HIS: ", chatHistory);

        return NextResponse.json(
            { chats: chatHistory },
            { status: 200 },

        );
    } catch (error) {
        console.log(`Failed to fetch chats from backend: ${error}`);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}

