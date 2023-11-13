import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { MatchFormat } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const playerId = url.searchParams.get('playerId')?.toString()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString() as MatchFormat

    if (!playerId || !matchFormat) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        let whereClause: { playerId: string; matchFormat?: MatchFormat } = {
            playerId: playerId
        }

        const playerData = await prismaClient.player.findUnique({
            where: whereClause
        })


        // Add match format
        if (matchFormat) {
            whereClause = { ...whereClause, matchFormat: matchFormat.toUpperCase() as MatchFormat }
        }

        const batData = await prismaClient.batting.findMany({
            where: whereClause,
            orderBy: [
                { matchDate: 'desc' },
            ],
            take: 10
        })

        const bowlData = await prismaClient.bowling.findMany({
            where: whereClause,
            orderBy: [
                { matchDate: 'desc' },
            ],
            take: 10
        })

        return NextResponse.json({ playerData, batData, bowlData }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}