import { ErrorMessage, Message } from '@/responses/messages';
import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { sortStringsAlphabetically } from '@/utils/utils';

interface RequestBody {
    teamA: string
    teamB: string
    batFirst: string
    venue: string
    venueCountry: string
    matchDate: string
    result: string
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
        // Create Team
        // await prismaClient.team.create({
        //     data: {
        //         teamName: 'India',
        //         teamId: 'IND',
        //         userId: userSession.id
        //     }
        // })

        // Create venue
        const venue = await prismaClient.venue.create({
            data: {
                venueId: body.venue.replaceAll(' ', '-').toLowerCase(),
                venueName: body.venue,
                venueCountryId: body.venueCountry,
                userId: userSession.id,
                matchDate: new Date(body.matchDate)
            }
        })

        // Create Match
        const teams: string[] = sortStringsAlphabetically(body.teamA, body.teamB)

        await prismaClient.match.create({
            data: {
                teamAId: teams[0],
                teamBId: teams[1],
                result: body.result,
                matchDate: new Date(body.matchDate),
                batFirst: body.batFirst,
                venueId: venue.id,
                userId: userSession.id
            }
        })

        // Add Batting
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }

    return new NextResponse(Message.MATCH_ADDED, { status: 200 })
}