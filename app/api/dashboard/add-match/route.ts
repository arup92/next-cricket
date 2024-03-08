import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from "@/libs/prismadb";
import { ErrorMessage, Message } from '@/responses/messages';
import { battingData, bowlingData, makeExtra, sortStringsAlphabetically, summaryData } from '@/utils/utils';
import { MatchFormat, MatchType } from "@prisma/client";
import { NextResponse } from 'next/server';
import { mergeNSortPointsWRank } from "./helper";

interface RequestBody {
    matchType: MatchType
    matchFormat: MatchFormat
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

    // Split scores and players scores
    const SAIndexToSplit = body.sessionAbat.indexOf("SR")
    const SBIndexToSplit = body.sessionBbat.indexOf("SR")

    // Sessions
    const sessionABat: string[][] = summaryData(body.sessionAbat.substring(SAIndexToSplit + 2), 7)
    const sessionBBat: string[][] = summaryData(body.sessionBbat.substring(SBIndexToSplit + 2), 7)
    let sessionABowl: string[][] = summaryData(body.sessionAbowl, 7)
    let sessionBBowl: string[][] = summaryData(body.sessionBbowl, 7)

    // Scores
    let sessionAScore = body.sessionAbat
        .substring(0, SAIndexToSplit).split('\n')
        .filter(item => item !== '')[1].split(' ')[0].split('/')

    let sessionBScore = body.sessionBbat
        .substring(0, SBIndexToSplit).split('\n')
        .filter(item => item !== '')[1].split(' ')[0].split('/')

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
        /*********************************************************************************************************/
        // Create Venue
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


        /*********************************************************************************************************/
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
                    matchType: body.matchType,
                    matchFormat: body.matchFormat,
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


        /*********************************************************************************************************/
        // Create Score
        const score = await prismaClient.scores.createMany({
            data: [{
                runs: parseInt(sessionAScore[0]),
                wickets: parseInt(sessionBScore[1]),
                matchId: match.id,
                teamId: body.batFirst,
                oppCountryId: (body.batFirst === body.teamA) ? body.teamB : body.teamA
            }, {
                runs: parseInt(sessionBScore[0]),
                wickets: parseInt(sessionAScore[1]),
                matchId: match.id,
                teamId: (body.batFirst === body.teamA) ? body.teamB : body.teamA,
                oppCountryId: body.batFirst
            }]
        })

        /*********************************************************************************************************/
        // Make Player array
        const playerData: any[] = []
        const playerTeam: any[] = []

        for (const sessionA of sessionABat) {
            const playerId = sessionA[0].replaceAll(' ', '_').replaceAll('-', '_').toLowerCase()
            const currentPlayerData: any = {
                playerId,
                playerName: sessionA[0]
            }

            const currentPlayerTeam = {
                playerId,
                teamId: body.batFirst
            }

            playerData.push(currentPlayerData)
            playerTeam.push(currentPlayerTeam)
        }

        for (const sessionB of sessionBBat) {
            const playerId = sessionB[0].replaceAll(' ', '_').replaceAll('-', '_').toLowerCase()

            const currentPlayerData: any = {
                playerId,
                playerName: sessionB[0]
            }

            const currentPlayerTeam = {
                playerId,
                teamId: (body.batFirst === body.teamA) ? body.teamB : body.teamA
            }

            playerData.push(currentPlayerData)
            playerTeam.push(currentPlayerTeam)
        }

        for (const sessionAB of sessionABowl) {
            const playerId = sessionAB[0].replaceAll(' ', '_').replaceAll('-', '_').toLowerCase()

            const currentPlayerData: any = {
                playerId,
                playerName: sessionAB[0]
            }

            const currentPlayerTeam = {
                playerId,
                teamId: (body.batFirst === body.teamA) ? body.teamB : body.teamA
            }

            playerData.push(currentPlayerData)
            playerTeam.push(currentPlayerTeam)
        }

        for (const sessionBB of sessionBBowl) {
            const playerId = sessionBB[0].replaceAll(' ', '_').replaceAll('-', '_').toLowerCase()

            const currentPlayerData: any = {
                playerId,
                playerName: sessionBB[0]
            }

            const currentPlayerTeam = {
                playerId,
                teamId: body.batFirst
            }

            playerData.push(currentPlayerData)
            playerTeam.push(currentPlayerTeam)
        }


        /*********************************************************************************************************/
        // Insert Player
        for (const item of playerData) {
            await prismaClient.player.upsert({
                where: {
                    playerId: item.playerId
                },
                update: {},
                create: item
            })
        }

        /*********************************************************************************************************/
        // Insert PlayerTeam
        for (const item of playerTeam) {
            await prismaClient.playerTeam.upsert({
                where: {
                    playerId_teamId: {
                        playerId: item.playerId,
                        teamId: item.teamId
                    }
                },
                update: {
                    active: 'yes'
                },
                create: item
            })
        }

        /*********************************************************************************************************/
        // Add Batting: Session A
        const constantBattingAData = {
            matchFormat: body.matchFormat,
            userId: userSession.id,
            venueId: venue.venueId,
            teamId: body.batFirst,
            oppCountryId: (body.batFirst === body.teamA) ? body.teamB : body.teamA,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const battingADataUpdated = battingData(sessionABat, body.matchFormat as MatchFormat).map(battingData => ({
            ...battingData,
            ...constantBattingAData
        }))

        await Promise.all(battingADataUpdated.map(async (battingData) => {
            await prismaClient.batting.create({
                data: battingData as any
            })
        }))

        // Add Batting: Session B
        const constantBattingBData = {
            matchFormat: body.matchFormat,
            userId: userSession.id,
            venueId: venue.venueId,
            teamId: (body.batFirst === body.teamA) ? body.teamB : body.teamA,
            oppCountryId: body.batFirst,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const battingBDataUpdated = battingData(sessionBBat, body.matchFormat as MatchFormat).map(battingData => ({
            ...battingData,
            ...constantBattingBData
        }))

        await Promise.all(battingBDataUpdated.map(async (battingData) => {
            await prismaClient.batting.create({
                data: battingData as any
            })
        }))

        // Add Bowling: Session A

        // Add the extra data
        const extraBowlingAData = makeExtra(sessionABat, sessionABowl)
        sessionABowl.forEach(item => {
            if (extraBowlingAData.hasOwnProperty(item[0])) {
                item.push(extraBowlingAData[item[0]].toString())
            } else {
                item.push('na')
            }
        })

        const constantBowlingAData = {
            matchFormat: body.matchFormat,
            userId: userSession.id,
            venueId: venue.venueId,
            teamId: (body.batFirst === body.teamA) ? body.teamB : body.teamA,
            oppCountryId: body.batFirst,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const bowlingADataUpdated = bowlingData(sessionABowl, body.matchFormat as MatchFormat).map(bowlingData => ({
            ...bowlingData,
            ...constantBowlingAData
        }))

        await Promise.all(bowlingADataUpdated.map(async (bowlingData) => {
            await prismaClient.bowling.create({
                data: bowlingData as any
            })
        }))

        // Add Bowling: Session B

        // Add the extra data
        const extraBowlingBData = makeExtra(sessionBBat, sessionBBowl)
        sessionBBowl.forEach(item => {
            if (extraBowlingBData.hasOwnProperty(item[0])) {
                item.push(extraBowlingBData[item[0]].toString())
            } else {
                item.push('na')
            }
        })

        const constantBowlingBData = {
            matchFormat: body.matchFormat,
            userId: userSession.id,
            venueId: venue.venueId,
            teamId: body.batFirst,
            oppCountryId: (body.batFirst === body.teamA) ? body.teamB : body.teamA,
            matchDate: new Date(body.matchDate),
            matchId: match.id
        }

        const bowlingBDataUpdated = bowlingData(sessionBBowl, body.matchFormat as MatchFormat).map(bowlingData => ({
            ...bowlingData,
            ...constantBowlingBData
        }))

        await Promise.all(bowlingBDataUpdated.map(async (bowlingData) => {
            await prismaClient.bowling.create({
                data: bowlingData as any
            })
        }))

        /*********************************************************************************************************/
        // Insert into Rank table
        const allBattingData: any = [...battingADataUpdated, ...battingBDataUpdated]
        const allBowlingData: any = [...bowlingADataUpdated, ...bowlingBDataUpdated]

        const rankData = mergeNSortPointsWRank(allBattingData, allBowlingData, match.id)

        await prismaClient.rank.createMany({
            data: rankData
        })

        return NextResponse.json({ message: Message.MATCH_ADDED, matchId: match.id }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}