import getCurrentUser from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';
import { ErrorMessage, Message } from '@/responses/messages';
import { BowlingTypeConst } from '@/types/BowlingDataType';
import { PlayerTypeConst } from '@/types/Player';
import { NextResponse } from 'next/server';

interface RequestBody {
    playerId: string
    description?: string
    bowlingType?: typeof BowlingTypeConst
    playerType?: typeof PlayerTypeConst
}

export async function PATCH(request: Request) {
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    const body: RequestBody = await request.json()

    if (!body.description && !body.bowlingType && !body.playerType) {
        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    } else if (!body.playerId) {
        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }

    try {
        // Construct the update data
        const data: any = {}
        if (body.description) {
            data.description = body.description
        }
        if (body.bowlingType) {
            data.bowlingType = body.bowlingType
        }
        if (body.playerType) {
            data.playerType = body.playerType
        }

        await prismaClient.player.update({
            where: {
                playerId: body.playerId
            },
            data
        })

        return new NextResponse(Message.UPDATED, { status: 200 })
    } catch (error) {
        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}