import getCurrentUser from "@/actions/getCurrentUser"
import prismaClient from "@/libs/prismadb"
import { ErrorMessage, Message } from "@/responses/messages"
import { Bool } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
    const url = new URL(request.url)
    const playerId = url.searchParams.get('playerId')
    const inactive = url.searchParams.get('inactive')
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    if (!playerId || !inactive) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {

        // Player table
        await prismaClient.player.update({
            where: {
                playerId
            },
            data: {
                inactive: inactive as Bool
            }
        })

        return NextResponse.json(Message.UPDATED, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}