import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { MatchFormat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const venueId = url.searchParams.get('venueId')?.toString().toLowerCase()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString().toUpperCase() as MatchFormat

    if (!venueId || !matchFormat) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 })
    }

    try {
        const venues = await prismaClient.match.findMany({
            where: {
                venueId,
                matchFormat
            },
            select: {
                venueId: true,
                matchFormat: true,
                teamAId: true,
                teamBId: true,
                result: true,
                batFirst: true,
                matchDate: true,
                Scores: {
                    select: {
                        teamId: true,
                        runs: true,
                        wickets: true,
                        oppCountryId: true
                    }
                }
            },
            take: 5,
            orderBy: {
                matchDate: 'desc'
            }
        })

        return NextResponse.json(venues, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}