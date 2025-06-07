import { NextRequest, NextResponse } from "next/server";

// Make a POST request to server: send message
export async function POST(request: NextRequest) {

    // get message from the request body
    const { user, message } = await request.json();

    // check null
    if (!message) {
        return NextResponse.json(
            {
                error: 'Message is not defined!',
            },
            { status: 400 },

        );
    }

    // send POST request to server
    try {

        // Post request with message payload
        const res = await fetch(`${process.env.SERVER_URI}/api/chat/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, message }),
        });

        // get response result
        const data = await res.json();

        // return response
        return NextResponse.json(
            { reply: data },
            { status: 200 },
        );

    } catch (error) {
        console.log(`Failed to fetch from backend: ${error}`);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}
