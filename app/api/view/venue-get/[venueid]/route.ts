import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { venueid: string } }) {
    const venueId = params.venueid

    if (!venueId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        const venueData = await prismaClient.venue.findUnique({
            where: {
                venueId
            },
            select: {
                venueId: true,
                venueName: true,
                venueCountryId: true,
                matches: {
                    select: {
                        matchFormat: true,
                        teamAId: true,
                        teamBId: true,
                        result: true,
                        batFirst: true,
                        matchDate: true,
                        batting: true,
                        bowling: true,
                        Scores: true,
                    },
                    take: 10
                }
            }
        })

        return NextResponse.json(venueData, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}