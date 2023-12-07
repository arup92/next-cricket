import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { sortStringsAlphabetically } from "@/utils/utils";
import { MatchFormat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const teamA = url.searchParams.get('teamA')?.toString().toUpperCase()
    const teamB = url.searchParams.get('teamB')?.toString().toUpperCase()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString().toUpperCase() as MatchFormat

    if (!teamA || !teamB || !matchFormat) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 })
    }

    try {
        const teams: string[] = sortStringsAlphabetically(teamA, teamB) // Sort teams

        // Prisma call: match
        const teamStat = await prismaClient.match.findMany({
            where: {
                teamAId: teams[0],
                teamBId: teams[1],
                matchFormat
            },
            select: {
                teamAId: true,
                teamBId: true,
                result: true,
                venueId: true,
                matchFormat: true,
                venue: {
                    select: {
                        venueCountryId: true
                    }
                },
                matchDate: true
            }
        })

        return NextResponse.json(teamStat.slice(0, 4), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}