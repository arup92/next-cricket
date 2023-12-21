import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    const url = new URL(request.url)
    const team = url.searchParams.get('team')?.toString()
    const playerName = url.searchParams.get('playerName')?.toString()

    if (!playerName && !team) {
        return NextResponse.json(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        // Construct where clause
        let where = {}
        if (playerName) {
            where = {
                playerId: {
                    contains: playerName.toLowerCase().replaceAll(' ', ',')
                }
            }
        } else if (team) {
            where = {
                playerTeams: {
                    every: {
                        teamId: team.toUpperCase()
                    }
                }
            }
        }

        // Find matches
        const player = await prismaClient.player.findMany({
            where,
            orderBy: {
                playerName: 'asc'
            }
        })

        return NextResponse.json(player, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}