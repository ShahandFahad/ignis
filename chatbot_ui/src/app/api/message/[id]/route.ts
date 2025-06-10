import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Make a GET request to server: get chat histroy
export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    // get user name from next.js request
    const { id } = await params;
    const username: string = id;

    // send GET request to ser
    try {
        // Cookies are stored via login and register auth operations
        // on the client sides, and in order to access it here on server side in next.js api
        // we use the inbuilt cookies next.js api to access it and send it along side the request to the server
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('jwt');

        // get request for chat histroy
        const res = await fetch(`${process.env.SERVER_URI}/api/chat/history/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${authCookie?.name}=${authCookie?.value}`,
            },
            credentials: 'include',
        });

        // get chat history
        const chatHistory = await res.json();

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

