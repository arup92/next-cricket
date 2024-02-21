import getCurrentUser from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';
import { ErrorMessage, Message } from '@/responses/messages';
import { BowlingTypeConst } from '@/types/BowlingDataType';
import { PlayerTypeConst } from '@/types/Player';
import { Bool } from '@prisma/client';
import { NextResponse } from 'next/server';

interface RequestBody {
    playerId: string
    teamId: string
    description?: string
    bowlingType?: typeof BowlingTypeConst
    playerType?: typeof PlayerTypeConst,
    active?: Bool
}

export async function PATCH(request: Request) {
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    const body: RequestBody = await request.json()
    if (!body.description && !body.bowlingType && !body.playerType && !body.active) {
        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    } else if (!body.playerId) {
        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }

    try {
        // Construct the update data
        const data: any = {
            ...(body.description ? { description: body.description } : {}),
            ...(body.bowlingType ? { bowlingType: body.bowlingType } : {}),
            ...(body.playerType ? { playerType: body.playerType } : {}),
        }

        if (body.description || body.bowlingType || body.playerType) {
            await prismaClient.player.update({
                where: {
                    playerId: body.playerId,
                },
                data
            })
        }

        if (body.active) {
            // data.inactive = body.inactive as Bool
            await prismaClient.playerTeam.update({
                where: {
                    playerId_teamId: {
                        playerId: body.playerId,
                        teamId: body.teamId,
                    }
                },
                data: {
                    active: 'yes'
                }
            })
        }

        return new NextResponse(Message.UPDATED, { status: 200 })
    } catch (error) {
        console.log(error);

        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}