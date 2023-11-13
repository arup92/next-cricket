import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { sortStringsAlphabetically } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const teamA = url.searchParams.get('teamA')?.toString()
    const teamB = url.searchParams.get('teamB')?.toString()
    const matchFormat = url.searchParams.get('matchFormat')?.toString()

    try {
        // Construct where clause
        let where = {}
        if (teamA && teamB) {
            const teams: string[] = sortStringsAlphabetically(teamA, teamB) // Sort teams

            where = {
                teamAId: teams[0],
                teamBId: teams[1]
            }
        } else if (teamA) {
            where = {
                OR: [
                    { teamAId: teamA },
                    { teamBId: teamA }
                ]
            }
        }

        // Update the where clause fot match format
        if (matchFormat) {
            where = { ...where, matchFormat }
        }

        // Find matches
        const matches = await prismaClient.match.findMany({
            select: {
                id: true,
                teamAId: true,
                teamBId: true,
                result: true,
                batFirst: true,
                matchDate: true,
                matchFormat: true,
                venueId: true,
                venue: {
                    select: {
                        venueName: true,
                        venueCountryId: true
                    }
                },
            },
            orderBy: {
                matchDate: 'desc'
            },
            where: where,
            take: 100
        })

        return NextResponse.json(matches, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}