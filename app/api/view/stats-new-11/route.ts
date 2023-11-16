import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { MatchFormat } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const teamA = url.searchParams.get('teamA')?.toString().toUpperCase()
    const teamB = url.searchParams.get('teamB')?.toString().toUpperCase()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString() as MatchFormat

    if (!teamA || !teamB || !matchFormat) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 })
    }

    try {
        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365)

        const teamBat = await prismaClient.batting.findMany({
            where: {
                OR: [
                    { teamId: teamA },
                    { teamId: teamB }
                ],
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat
            },
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            take: 440
        })

        const teamBowl = await prismaClient.bowling.findMany({
            where: {
                OR: [
                    { teamId: teamA },
                    { teamId: teamB }
                ],
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat
            },
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            take: 440
        })

        // Make the player data
        let playerData: any = {}

        for (const item of teamBat) {
            playerData[item.teamId] ??= {}
            playerData[item.teamId][item.playerId] ??= { scores: [], wickets: [], vs: { scores: [], wickets: [] } }

            if (playerData[item.teamId][item.playerId].scores.length < 5) {
                playerData[item.teamId][item.playerId].scores.push(item.run)
            }

            if (playerData[item.teamId][item.playerId].vs.scores.length < 5
                && (item.oppCountryId === teamA || item.oppCountryId === teamB)) {
                playerData[item.teamId][item.playerId].vs.scores.push(item.run)
            }
        }

        for (const item of teamBowl) {
            playerData[item.teamId] ??= {}
            playerData[item.teamId][item.playerId] ??= { scores: [], wickets: [], vs: { scores: [], wickets: [] } }

            if (playerData[item.teamId][item.playerId].wickets.length < 5) {
                playerData[item.teamId][item.playerId].wickets.push(item.wicket)
            }

            if (playerData[item.teamId][item.playerId].vs.wickets.length < 5
                && (item.oppCountryId === teamA || item.oppCountryId === teamB)) {
                playerData[item.teamId][item.playerId].vs.wickets.push(item.wicket)
            }
        }

        return NextResponse.json(playerData, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}