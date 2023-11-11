import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const teamA = url.searchParams.get('teamA')?.toString().toUpperCase()
    const teamB = url.searchParams.get('teamB')?.toString().toUpperCase()

    if (!teamA) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 })
    }

    try {
        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365)

        let whereClause = {}
        if (!!teamB) {
            whereClause = {
                OR: [
                    { teamId: teamA },
                    { teamId: teamB }
                ],
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                }
            }
        } else {
            whereClause = {
                teamId: teamA,
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                }
            }
        }

        const teamBowl = await prismaClient.bowling.findMany({
            where: whereClause,
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            take: 220
        })

        let playerData: any = {}
        if (!!teamB) {
            playerData = {
                [teamA]: {},
                [teamB]: {}
            }
        } else {
            playerData = {
                [teamA]: {}
            }
        }

        for (const item of teamBowl) {
            if (item.playerId in playerData[item.teamId]) {
                if (playerData[item.teamId][item.playerId].length >= 5) {
                    continue
                }
                playerData[item.teamId][item.playerId].push(item.wicket)
            } else {
                playerData[item.teamId][item.playerId] = [item.wicket]
            }
        }

        return NextResponse.json(playerData, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}