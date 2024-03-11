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
            },
            include: {
                savedTeamPlayers: true,
                teamA: true,
                teamB: true
            }
        })

        if (!savedTeam) {
            return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
        }

        return NextResponse.json(savedTeam.savedTeamPlayers, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}