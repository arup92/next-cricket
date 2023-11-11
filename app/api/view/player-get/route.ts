import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const playerId = url.searchParams.get('playerId')?.toString()

    if (!playerId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        const playerData = await prismaClient.player.findUnique({
            where: {
                playerId: playerId
            }
        })

        const batData = await prismaClient.batting.findMany({
            where: {
                playerId: playerId
            }
        })

        const bowlData = await prismaClient.bowling.findMany({
            where: {
                playerId: playerId
            }
        })

        return NextResponse.json({ playerData, batData, bowlData }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}