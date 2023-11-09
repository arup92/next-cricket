import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const teamA = url.searchParams.get('teamA')?.toString().toUpperCase()
    const venueId = url.searchParams.get('venueId')?.toString().toLowerCase()

    if (!teamA) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 })
    }

    try {
        // Prisma call: match
        const teamStat = await prismaClient.match.findMany({
            where: {
                OR: [
                    { teamAId: teamA },
                    { teamBId: teamA }
                ]
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
        const stats = getWL(teamStat, teamA)

        // Filter by venue
        let statsByVenue: string[] = []
        if (!!venueId) {
            let filterByVenue = teamStat.filter(item => item.venueId === venueId)
            statsByVenue = getWL(filterByVenue, teamA)
        }

        return NextResponse.json({ stats, statsByVenue }, { status: 200 })
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