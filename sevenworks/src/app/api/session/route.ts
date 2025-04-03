import { NextResponse } from "next/server";
import admin from "@/app/lib/firebase-admin";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json({ sessionData: {} });
        }

        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        const userSessionDoc = await admin.firestore().collection("sessions").doc(decodedClaims.uid).get();

        if (!userSessionDoc.exists) {
            return NextResponse.json({ sessionData: {} }, { status: 404 }); // No data found
        }

        const sessionData = userSessionDoc.data();

        return NextResponse.json({ sessionData });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}
