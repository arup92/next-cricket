import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { NextResponse } from "next/server";

export const revalidate = 1

export async function GET(request: Request) {
    const url = new URL(request.url)
    let teamType = url.searchParams.get('teamType')?.toString().toLowerCase()

    teamType = (teamType === 'odi' || teamType === 't20') ? 'national' : teamType

    try {
        const where = {
            ...(!!teamType ? { teamType: teamType.toLowerCase() } : {})
        }

        // Find all teams
        const teams = await prismaClient.team.findMany({
            where,
            orderBy: {
                teamId: 'asc'
            },
            select: {
                teamId: true,
                teamName: true,
                teamType: true
            },
        })

        return NextResponse.json(teams, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}