import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { getPlayerStats } from "@/utils/utils"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const shortUrl = url.searchParams.get('shortUrl')?.toString()

    try {
        const savedTeam = await prismaClient.savedTeam.findUnique({
            where: {
                shortUrl
            }
        })

        if (!!savedTeam) {
            const savedTeamPlayers = await prismaClient.savedTeamPlayers.findMany({
                where: {
                    savedTeamId: savedTeam.id,
                    Player: {
                        playerTeams: {
                            some: {
                                active: 'yes',
                                OR: [
                                    { teamId: savedTeam.teamAId },
                                    { teamId: savedTeam.teamBId }
                                ]
                            }
                        }
                    }
                }
            })

            return NextResponse.json(savedTeamPlayers, { status: 200 })
        }

        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}