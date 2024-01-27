import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const term = url.searchParams.get('term')

    if (!term) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        const player = await prismaClient.player.findMany({
            where: {
                playerName: {
                    contains: term?.toLowerCase().replaceAll(' ', '_'),
                    mode: 'insensitive'
                }
            },
            select: {
                playerId: true,
                playerName: true
            },
            orderBy: {
                playerName: 'asc'
            },
            take: 10
        })

        const team = await prismaClient.team.findMany({
            where: {
                teamName: {
                    contains: term?.toLowerCase().replaceAll(' ', '_'),
                    mode: 'insensitive'
                }
            },
            select: {
                teamId: true,
                teamName: true
            },
            orderBy: {
                teamName: 'asc'
            },
            take: 10
        })

        const venue = await prismaClient.venue.findMany({
            where: {
                venueName: {
                    contains: term?.toLowerCase().replaceAll(' ', '_'),
                    mode: 'insensitive'
                }
            },
            select: {
                venueId: true,
                venueName: true,
                venueCountryId: true
            },
            orderBy: {
                venueName: 'asc'
            },
            take: 10
        })

        const result = {
            player,
            team,
            venue
        }

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}