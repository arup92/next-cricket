import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { MatchFormat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const team = url.searchParams.get('team')?.toString().toUpperCase() as string
    const venueId = url.searchParams.get('venueId')?.toString().toLowerCase()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString() as MatchFormat

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
                venueId: true
            },
            orderBy: [
                { matchDate: 'desc' }
            ],
            take: 5
        })

        // Modify the result for 'w' & 'l'
        const stats = getWL(teamStat, team)

        // Filter by venueId
        let statsByVenue: string[] = []
        if (!!venueId) {
            const filterVenue = await prismaClient.match.findMany({
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

            statsByVenue = getWL(filterVenue, team)
        }

        // Get Scores
        const scores = await prismaClient.scores.findMany({
            where: {
                teamId: team
            },
            take: 5
        })

        // const scores = await prismaClient.batting.groupBy({
        //     where: {
        //         teamId: team,
        //         matchFormat,
        //     },
        //     _sum: {
        //         run: true
        //     },
        //     by: ["matchId", "matchDate"],
        //     take: 5,
        //     orderBy: {
        //         matchDate: 'desc'
        //     }
        // })


        // // Get Wickets
        // const wickets = await prismaClient.bowling.groupBy({
        //     where: {
        //         teamId: team,
        //         matchFormat,
        //     },
        //     _sum: {
        //         wicket: true
        //     },
        //     by: ["matchId", "matchDate"],
        //     take: 5,
        //     orderBy: {
        //         matchDate: 'desc'
        //     }
        // })

        return NextResponse.json({ team: team, stats, statsByVenue, scores }, { status: 200 })
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