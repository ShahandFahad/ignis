import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Make a POST request to server: send message
export async function POST(request: NextRequest) {

    // get message from the request body
    const { username, message } = await request.json();
    // temp fix - the api accept user instead of user name, so just a temp fix
    const user = username;

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
        // Cookies are stored via login and register auth operations
        // on the client sides, and in order to access it here on server side in next.js api
        // we use the inbuilt cookies next.js api to access it and send it along side the request to the server
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('jwt');

        // Post request with message payload
        const res = await fetch(`${process.env.SERVER_URI}/api/chat/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${authCookie?.name}=${authCookie?.value}`,
            },
            body: JSON.stringify({ user, message }),
            credentials: 'include',
        });

        // get response result
        const data = await res.json();

        // return response
        return NextResponse.json(
            { reply: data },
            { status: 200 },
        );

    } catch (error) {
        console.log(`Failed to send message to server: ${error}`);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}
