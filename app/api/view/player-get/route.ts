import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { MatchFormat } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const playerId = url.searchParams.get('playerId')?.toString()

    if (!playerId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        const twoYearsAgo = new Date();
        twoYearsAgo.setDate(twoYearsAgo.getDate() - 730)

        // Player Table
        const playerData = await prismaClient.player.findUnique({
            where: {
                playerId
            }
        })

        // Batting Table
        const batData = await prismaClient.batting.findMany({
            where: {
                playerId,
                matchDate: {
                    lte: new Date(),
                    gte: twoYearsAgo
                },
            },
            orderBy: [
                { matchDate: 'desc' },
            ],
            select: {
                run: true,
                six: true,
                four: true,
                matchDate: true,
                playerId: true,
                strikeRate: true,
                matchFormat: true,
                teamId: true,
                oppCountryId: true,
                venueId: true,
                id: true,
                Match: true
            }
        })

        // Bowling Table
        const bowlData = await prismaClient.bowling.findMany({
            where: {
                playerId,
                matchDate: {
                    lte: new Date(),
                    gte: twoYearsAgo
                },
            },
            orderBy: [
                { matchDate: 'desc' },
            ],
            select: {
                wicket: true,
                eco: true,
                id: true,
                maiden: true,
                matchDate: true,
                teamId: true,
                oppCountryId: true,
                matchFormat: true,
                playerId: true,
                venueId: true,
                Match: true,
            }
        })

        return NextResponse.json({ playerData, batData, bowlData }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}