import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from '@/libs/prismadb';
import { ErrorMessage, Message } from '@/responses/messages';
import { fantasyPointsCount } from "@/utils/utils";
import { NextResponse } from 'next/server';

interface RequestBody {
    matchId: string
}

export async function POST(request: Request) {
    // const userSession = await getCurrentUser()

    // // Check if user is authenticated
    // if (!userSession) {
    //     return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    // }

    try {
        const { matchId }: RequestBody = await request.json()

        const battingData = await prismaClient.batting.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                matchId: parseInt(matchId)
            }
        })

        await prismaClient.$transaction(async (prisma) => {
            for (const innings of battingData) {
                await prisma.batting.update({
                    where: {
                        id: innings.id
                    },
                    data: {
                        f11points: fantasyPointsCount(innings, "bat")
                    }
                })
            }
        })

        const bowlingData = await prismaClient.bowling.findMany({
            orderBy: {
                id: 'asc'
            }
        })

        // await prismaClient.$transaction(async (prisma) => {
        for (const innings of bowlingData) {
            await prismaClient.bowling.update({
                where: {
                    id: innings.id
                },
                data: {
                    f11points: fantasyPointsCount(innings, "bowl")
                }
            })
        }
        // })

        return new NextResponse(Message.UPDATED, { status: 200 })
    } catch (error) {
        console.log(error);

        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}