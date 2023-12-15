import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const matchId = url.searchParams.get('matchId')?.toString()

    if (!matchId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        // Find match
        const match = await prismaClient.match.findUnique({
            where: {
                id: parseInt(matchId)
            },
            select: {
                batFirst: true,
                id: true,
                matchDate: true,
                matchFormat: true,
                result: true,
                teamAId: true,
                teamBId: true,
                venueId: true,
                venue: {
                    select: {
                        venueCountryId: true,
                    }
                }
            }
        })

        // Find Scores
        const scores = await prismaClient.scores.findMany({
            where: {
                matchId: parseInt(matchId)
            }
        })

        // Find batting
        const batting = await prismaClient.batting.findMany({
            where: {
                matchId: parseInt(matchId as string)
            },
            orderBy: [
                { run: 'desc' }
            ]
        })

        const battingA = batting.filter(item => item.teamId === match?.teamAId)
        const battingB = batting.filter(item => item.teamId === match?.teamBId)

        // Find bowling
        const bowling = await prismaClient.bowling.findMany({
            where: {
                matchId: parseInt(matchId as string)
            },
            orderBy: [
                { wicket: 'desc' }
            ]
        })

        const bowlingA = bowling.filter(item => item.teamId === match?.teamAId)
        const bowlingB = bowling.filter(item => item.teamId === match?.teamBId)

        // Combine the values
        const returnData = {
            match,
            scores,
            batting: {
                battingA,
                battingB
            },
            bowling: {
                bowlingA,
                bowlingB
            }
        }

        return NextResponse.json(returnData, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}