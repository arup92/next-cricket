import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { MatchFormat } from '@prisma/client';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const team = url.searchParams.get('team')?.toString().toUpperCase() as string
    const venueId = url.searchParams.get('venueId')?.toString().toLowerCase()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString().toUpperCase() as MatchFormat

    if (!team || !matchFormat) {
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
                matchFormat,
            },
            select: {
                teamAId: true,
                teamBId: true,
                batFirst: true,
                result: true,
                venueId: true,
                matchDate: true
            },
            orderBy: [
                { matchDate: 'desc' }
            ],
            take: 5
        })

        // Filter by venueId
        let filterVenue = {}
        if (!!venueId) {
            filterVenue = await prismaClient.match.findMany({
                where: {
                    OR: [
                        { teamAId: team },
                        { teamBId: team }
                    ],
                    matchFormat,
                    venueId
                },
                orderBy: [
                    { matchDate: 'desc' }
                ],
                take: 5
            })
        }

        // Get Scores
        const scores = await prismaClient.scores.findMany({
            where: {
                teamId: team,
                Match: {
                    matchFormat
                }
            },
            select: {
                teamId: true,
                oppCountryId: true,
                runs: true,
                wickets: true,
                Match: {
                    select: {
                        matchDate: true
                    }
                }
            },
            orderBy: [
                {
                    Match: {
                        matchDate: 'desc'
                    }
                }
            ],
            take: 5
        })

        return NextResponse.json({ team: team, teamStat, filterVenue, scores }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}