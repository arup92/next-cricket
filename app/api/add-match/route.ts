import { ErrorMessage } from '@/responses/messages';
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismaClient from '@/libs/prismadb';

interface RequestBody {
    teamA: string
    teamB: string
    batFirst: string
    venue: string
    venueCountry: string
    matchDate: Date
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

    const venue = await prismaClient.venue.findUnique({
        where: {
            venueId: body.venue.replaceAll(' ', '-').toLowerCase()
        }
    })

    if (venue === null) {
        await prismaClient.venue.create({
            data: {
                venueId: body.venue.replaceAll(' ', '-').toLowerCase(),
                venueName: body.venue,
                venueCountryId: body.venueCountry,
                userId: userSession.id
            }
        })
    } else {
        await prismaClient.venue.update({
            where: {
                venueId: body.venue.replaceAll(' ', '-').toLowerCase(),
            },
            data: {

            }
        })
    }

    return new NextResponse('OK', { status: 200 })
}