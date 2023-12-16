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
        // DB Call
        const match = await prismaClient.match.findUnique({
            where: {
                id: parseInt(matchId)
            },
            include: {
                Scores: true,
                batting: { orderBy: [{ f11points: 'desc' }] },
                bowling: { orderBy: [{ f11points: 'desc' }] },
                venue: true
            }
        })

        // Conditionally make teamAId and teamBId based on batFirst
        let teamAId = match?.teamAId
        let teamBId = match?.teamBId
        if (teamAId !== match?.batFirst) {
            teamAId = match?.teamBId
            teamBId = match?.teamAId
        }

        // Update the values
        const battingA = match?.batting.filter(item => item.teamId === teamAId)
        const battingB = match?.batting.filter(item => item.teamId === teamBId)

        const bowlingA = match?.bowling.filter(item => item.teamId === teamAId)
        const bowlingB = match?.bowling.filter(item => item.teamId === teamBId)

        const scoreA = match?.Scores.filter(item => item.teamId === teamAId) as any[]
        const scoreB = match?.Scores.filter(item => item.teamId === teamBId) as any[]

        // Combine the values
        const returnData = {
            match: {
                id: match?.id,
                batFirst: match?.batFirst,
                matchDate: match?.matchDate,
                matchFormat: match?.matchFormat,
                result: match?.result,
                teamAId: match?.teamAId,
                teamBId: match?.teamBId,
                venueId: match?.venueId,
                venue: {
                    venueCountryId: match?.venue.venueCountryId
                }
            },
            scores: [...scoreA, ...scoreB],
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