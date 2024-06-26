import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { NextResponse } from "next/server";

export const revalidate = 1

export async function GET(request: Request) {
    const url = new URL(request.url)
    let teamType: any = url.searchParams.get('teamType')?.toString().toLowerCase()
    let playerTeams = url.searchParams.get('playerTeams')?.toString().toLowerCase().split(',')
    let Countries = url.searchParams.get('countries')?.toString()

    teamType = (teamType === 'odi' || teamType === 't20') ? { in: ['national', 'u19', 'women'] } : teamType?.toLowerCase()

    try {
        const where = {
            ...(!!teamType ? { teamType } : {}),
            ...(!!playerTeams ? { teamType: { in: playerTeams } } : {}),
            ...(!!Countries ? { teamType: 'national' } : {})
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