import getCurrentUser from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';
import { ErrorMessage, Message } from '@/responses/messages';
import { NextResponse } from 'next/server';

interface RequestBody {
    teamId: string
}

export async function PATCH(request: Request) {
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    const body: RequestBody = await request.json()
    if (!body.teamId) {
        return NextResponse.json(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        // Update the player table
        await prismaClient.playerTeam.updateMany({
            where: {
                teamId: body.teamId
            },
            data: {
                active: 'no'
            }
        })

        return new NextResponse(Message.UPDATED, { status: 200 })
    } catch (error) {
        console.log(error);

        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}