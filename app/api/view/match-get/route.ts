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
        const match = await prismaClient.match.findUnique({
            where: {
                id: parseInt(matchId)
            },
            include: {
                Scores: true,
                batting: true,
                bowling: true,
                venue: true
            }
        })

        const battingA = match?.batting.filter(item => item.teamId === match?.teamAId)
        const battingB = match?.batting.filter(item => item.teamId === match?.teamBId)

        const bowlingA = match?.bowling.filter(item => item.teamId === match?.teamAId)
        const bowlingB = match?.bowling.filter(item => item.teamId === match?.teamAId)

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
            scores: match?.Scores,
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