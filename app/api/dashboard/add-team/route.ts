import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from "@/libs/prismadb";
import { ErrorMessage, Message } from '@/responses/messages';
import { addTeamSchema } from "@/utils/formSchema";
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

    const body: RequestBody = await request.json()
    const { teamName, teamId, teamType } = addTeamSchema.parse(body)

    const data = {
        teamName,
        teamId: teamId.toUpperCase(),
        userId: userSession.id,
        ...(!!teamType ? { teamType: teamType.toLowerCase() } : {})
    }

    try {
        await prismaClient.team.create({
            data
        })
        return NextResponse.json(Message.TEAM_ADDED, { status: 200 })
    } catch (error: any) {
        console.log(error)
        if (error.code === 'P2002') {
            return new NextResponse(ErrorMessage.DATA_EXISTS, { status: 500 })
        }
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}