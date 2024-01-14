import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { MatchFormat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slugs: string } }) {
    const teamId = params?.slugs[0]
    const matchFormat = params?.slugs[1]
    const venueId = params?.slugs[2]

    if (!teamId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    // Construct where clause
    let where = {
        OR: [
            { teamAId: teamId.toUpperCase() },
            { teamBId: teamId.toUpperCase() }
        ],
        ...(matchFormat ? { matchFormat: matchFormat.toUpperCase() as MatchFormat } : {}),
        ...(venueId ? { venueId: venueId.toUpperCase() } : {})
    }

    try {
        const matchData = await prismaClient.match.findMany({
            where,
            select: {
                teamAId: true,
                teamBId: true,
                batFirst: true,
                matchDate: true,
                matchFormat: true,
                result: true,

                venue: true,
                Scores: true,
                batting: true,
                bowling: {
                    include: {
                        Player: true
                    }
                },
            },
        })

        return NextResponse.json(matchData, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}