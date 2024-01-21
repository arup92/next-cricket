import getCurrentUser from "@/actions/getCurrentUser"
import prismaClient from "@/libs/prismadb"
import { ErrorMessage, Message } from "@/responses/messages"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
    const url = new URL(request.url)
    const matchId = url.searchParams.get('matchId')
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    if (!matchId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {

        // Match Table
        await prismaClient.match.delete({
            where: {
                id: parseInt(matchId)
            }
        })

        return NextResponse.json(Message.DELETED, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}