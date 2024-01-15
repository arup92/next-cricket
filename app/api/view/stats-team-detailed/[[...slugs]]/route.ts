import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { sortStringsAlphabetically } from "@/utils/utils";
import { MatchFormat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slugs: string } }) {
    const teamId = params?.slugs[0]
    const opponent = params?.slugs[1]
    const matchFormat = params?.slugs[2]
    const venueId = params?.slugs[3]

    if (!teamId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    let teams: string[] = []
    if (!!opponent && opponent !== 'all') {
        teams = sortStringsAlphabetically(teamId.toUpperCase(), opponent.toUpperCase())
    }

    // Construct where clause
    let where = {
        ...(!!opponent && opponent !== 'all' ? {
            teamAId: teams[0],
            teamBId: teams[1]
        } : {
            OR: [
                { teamAId: teamId.toUpperCase() },
                { teamBId: teamId.toUpperCase() }
            ]
        }),
        ...((matchFormat && matchFormat !== 'all') ? { matchFormat: matchFormat.toUpperCase() as MatchFormat } : {}),
        ...(venueId ? { venueId } : {})
    }

    try {
        const matchData = await prismaClient.match.findMany({
            where,
            select: {
                id: true,
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
            orderBy: {
                matchDate: 'desc'
            },
            take: 20
        })

        return NextResponse.json(matchData, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}