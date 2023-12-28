import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { NextResponse } from "next/server";

export const revalidate = 1

export async function GET(request: Request) {

    try {
        const venues = await prismaClient.venue.findMany({
            orderBy: {
                venueId: "asc"
            }
        })

        return NextResponse.json(venues, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}