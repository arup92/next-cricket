import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const teamA = url.searchParams.get('teamA')?.toString()
    const teamB = url.searchParams.get('teamB')?.toString()

    if (!teamA) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 })
    }

    try {
        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365)

        const teamABat = await prismaClient.batting.findMany({
            where: {
                teamId: teamA,
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                }
            },
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            take: 110
        })

        const playerData: any = {}
        for (const item of teamABat) {
            if (item.playerId in playerData) {
                if (playerData[item.playerId].length >= 5) {
                    continue
                }
                playerData[item.playerId].push(item.run)
            } else {
                playerData[item.playerId] = [item.run]
            }
        }

        return NextResponse.json(playerData, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}