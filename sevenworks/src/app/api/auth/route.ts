import { NextRequest, NextResponse } from "next/server";
import admin from "../../lib/firebase-admin";

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();

        if (!idToken) {
            console.error("Missing ID token in request");
            return NextResponse.json({ error: "ID token is required" }, { status: 400 });
        }

        //session expiration (1 day)
        const expiresIn = 24 * 60 * 60 * 1000;

        try {
            //verify the token
            console.log("About to verify token...");

            const decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log("Token verified successfully for UID:", decodedToken.uid);
            
            const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
            
            //Set session cookie in response
            const res = NextResponse.json({ success: true });
            
            res.cookies.set("session", sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: expiresIn / 1000,
                path: "/",
            });
            
            return res;
        } catch (error) {
            console.error("Token error: ", error);
            return NextResponse.json({error: "Unknown token error"}, {status: 401});
        }
    } catch (error) {
            console.error("Firebase session cookie creation error:", error);
            return NextResponse.json({ 
                error: "Invalid ID token"
            }, { status: 401 });
        }
}
