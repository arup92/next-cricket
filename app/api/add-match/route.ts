import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from '@/libs/prismadb';
import { ErrorMessage, Message } from '@/responses/messages';
import { battingData, bowlingData, sortStringsAlphabetically, summaryData } from '@/utils/utils';
import { NextResponse } from 'next/server';

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

    // Sessions
    const sessionABat: string[][] = summaryData(body.sessionAbat, 6)
    const sessionBBat: string[][] = summaryData(body.sessionBbat, 6)
    const sessionABowl: string[][] = summaryData(body.sessionAbowl, 7)
    const sessionBBowl: string[][] = summaryData(body.sessionBbowl, 7)

    // Validate venue
    const pattern = /^[a-zA-Z\s]*$/
    if (!pattern.test(body.venue)) {
        return NextResponse.json(ErrorMessage.INV_VENUE, { status: 401 })
    }

    // Validate Batting & Bowling sessions
    if (sessionABat[0].length < 6 || sessionBBat[0].length < 6 || sessionABowl[0].length < 7 || sessionBBowl[0].length < 7) {
        return new NextResponse(ErrorMessage.INV_SESSION_ENTRY, { status: 401 })
    }

    try {
        // Create Team
        // await prismaClient.team.create({
        //     data: {
        //         teamName: 'West Indies',
        //         teamId: 'WI',
        //         userId: userSession.id
        //     }
        // })

        // Create venue
        let venue = await prismaClient.venue.findUnique({
            where: {
                venueId: body.venue.replaceAll(' ', '-').toLowerCase()
            }
        })

        if (!venue) {
            venue = await prismaClient.venue.create({
                data: {
                    venueId: body.venue.replaceAll(' ', '-').toLowerCase(),
                    venueName: body.venue,
                    venueCountryId: body.venueCountry,
                    userId: userSession.id
                }
            })
        }

        // Create Match
        const teams: string[] = sortStringsAlphabetically(body.teamA, body.teamB)

        let match = await prismaClient.match.findFirst({
            where: {
                matchDate: new Date(body.matchDate),
                teamAId: teams[0]
            }
        })

        if (!match) {
            match = await prismaClient.match.create({
                data: {
                    teamAId: teams[0],
                    teamBId: teams[1],
                    result: body.result,
                    matchDate: new Date(body.matchDate),
                    batFirst: body.batFirst,
                    venueId: venue.venueId,
                    userId: userSession.id
                }
            })
        } else {
            return new NextResponse(ErrorMessage.MATCH_EXISTS, { status: 401 })
        }

        // Make Player array
        const playerData: Player[] = []
        for (const sessionA of sessionABat) {
            const currentPlayerData: Player = {
                playerId: sessionA[0].replaceAll(' ', '_').toLowerCase(),
                playerName: sessionA[0],
                playerCountryId: body.batFirst
            }

            playerData.push(currentPlayerData)
        }

        for (const sessionB of sessionBBat) {
            const currentPlayerData: Player = {
                playerId: sessionB[0].replaceAll(' ', '_').toLowerCase(),
                playerName: sessionB[0],
                playerCountryId: (body.batFirst === body.teamA) ? body.teamB : body.teamA
            }

            playerData.push(currentPlayerData)
        }

        for (const sessionAB of sessionABowl) {
            const currentPlayerData: Player = {
                playerId: sessionAB[0].replaceAll(' ', '_').toLowerCase(),
                playerName: sessionAB[0],
                playerCountryId: (body.batFirst === body.teamA) ? body.teamB : body.teamA
            }

            playerData.push(currentPlayerData)
        }

        for (const sessionBB of sessionBBowl) {
            const currentPlayerData: Player = {
                playerId: sessionBB[0].replaceAll(' ', '_').toLowerCase(),
                playerName: sessionBB[0],
                playerCountryId: body.batFirst
            }

            playerData.push(currentPlayerData)
        }

        // Insert Player
        for (const item of playerData) {
            const exists = await prismaClient.player.findUnique({
                where: {
                    playerId: item.playerId
                }
            })

            if (!exists) {
                await prismaClient.player.create({
                    data: item as any
                })
            }
        }

        // Add Batting: Session A
        const constantBattingAData = {
            userId: userSession.id,
            venueId: venue.venueId,
            oppCountryId: (body.batFirst === body.teamA) ? body.teamB : body.teamA,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const battingADataUpdated = battingData(sessionABat).map(battingData => ({
            ...battingData,
            ...constantBattingAData
        }))

        battingADataUpdated.forEach(async (battingData) => {
            await prismaClient.batting.create({
                data: battingData as any
            })
        })

        // Add Batting: Session B
        const constantBattingBData = {
            userId: userSession.id,
            venueId: venue.venueId,
            oppCountryId: body.batFirst,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const battingBDataUpdated = battingData(sessionBBat).map(battingData => ({
            ...battingData,
            ...constantBattingBData
        }))

        battingBDataUpdated.forEach(async (battingData) => {
            await prismaClient.batting.create({
                data: battingData as any
            })
        })

        // Add Bowling: Session A
        const constantBowlingAData = {
            userId: userSession.id,
            venueId: venue.venueId,
            oppCountryId: body.batFirst,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const bowlingADataUpdated = bowlingData(sessionABowl).map(bowlingData => ({
            ...bowlingData,
            ...constantBowlingAData
        }))

        bowlingADataUpdated.forEach(async (bowlingData) => {
            await prismaClient.bowling.create({
                data: bowlingData as any
            })
        })

        // Add Bowling: Session B
        const constantBowlingBData = {
            userId: userSession.id,
            venueId: venue.venueId,
            oppCountryId: (body.batFirst === body.teamA) ? body.teamB : body.teamA,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const bowlingBDataUpdated = bowlingData(sessionBBowl).map(bowlingData => ({
            ...bowlingData,
            ...constantBowlingBData
        }))

        bowlingBDataUpdated.forEach(async (bowlingData) => {
            await prismaClient.bowling.create({
                data: bowlingData as any
            })
        })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }

    return new NextResponse(Message.MATCH_ADDED, { status: 200 })
}