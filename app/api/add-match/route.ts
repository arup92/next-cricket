import { ErrorMessage, Message } from '@/responses/messages';
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismaClient from '@/libs/prismadb';

interface RequestBody {
    teamA: string
    teamB: string
    batFirst: string
    venue: string
    venueCountry: string
    matchDate: string
    matchResult: string
    batFirstWin: boolean
    sessionAbat: string
    sessionAbowl: string
    sessionBbat: string
    sessionBbowl: string
}

export async function POST(request: Request) {
    const userSession = await getCurrentUser()

    // Check if user is authenticated
    if (!userSession) {
        return NextResponse.json(ErrorMessage.UNAUTHENTICATED, { status: 401 })
    }

    const body: RequestBody = await request.json()

    // Validate venue
    const pattern = /^[a-zA-Z\s]*$/
    if (!pattern.test(body.venue)) {
        return NextResponse.json(ErrorMessage.INV_VENUE, { status: 401 })
    }

    try {
        //     // Create Team
        //     await prismaClient.team.findUnique({
        //     where: {
        //         teamId: body.teamA
        //     }
        // })

        // Create venue
        await prismaClient.venue.create({
            data: {
                venueId: body.venue.replaceAll(' ', '-').toLowerCase(),
                venueName: body.venue,
                venueCountryId: body.venueCountry,
                userId: userSession.id,
                matchDate: new Date(body.matchDate)
            }
        })

        // Create Match
        await prismaClient.match.create({
            data: {
                teamAId: body.teamA,
                teamBId: body.teamB,
                result: body.matchResult,
                matchDate: new Date(body.matchDate),
                batFirstWin: body.batFirstWin,
                venueId: body.venue,
                userId: userSession.id
            }
        })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }

    return new NextResponse(Message.MATCH_ADDED, { status: 200 })
}