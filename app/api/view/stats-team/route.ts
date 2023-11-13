import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { MatchFormat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const team = url.searchParams.get('team')?.toString().toUpperCase() as string
    const venueId = url.searchParams.get('venueId')?.toString().toLowerCase()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString() as MatchFormat

    if (!team && !matchFormat) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        // Prisma call: match
        const teamStat = await prismaClient.match.findMany({
            where: {
                OR: [
                    { teamAId: team },
                    { teamBId: team }
                ],
                matchFormat
            },
            select: {
                teamAId: true,
                teamBId: true,
                batFirst: true,
                result: true,
                venueId: true
            }
        })

        // Modify the result for 'w' & 'l'
        const stats = getWL(teamStat, team)

        // Filter by venue
        let statsByVenue: string[] = []
        if (!!venueId) {
            let filterByVenue = teamStat.filter(item => item.venueId === venueId)
            statsByVenue = getWL(filterByVenue, team)
        }

        return NextResponse.json({ team: team, stats, statsByVenue }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}

function getWL(teamStat: any[], teamA: string): string[] {
    const value = teamStat.map(item => {
        if (teamA === item.result) {
            return 'w'
        } else {
            return 'l'
        }
    })

    return value
}