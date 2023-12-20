import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from "@/libs/prismadb";
import { ErrorMessage, Message } from '@/responses/messages';
import { NextResponse } from 'next/server';

interface RequestBody {
    teamName: string
    teamId: string
    teamType: string
}

export async function POST(request: Request) {
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    const { teamName, teamId, teamType }: RequestBody = await request.json()

    try {
        await prismaClient.team.create({
            data: {
                teamName,
                teamId,
                teamType,
                userId: userSession.id
            }
        })
        return NextResponse.json({ message: Message.TEAM_ADDED }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}