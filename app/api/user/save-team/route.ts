import getCurrentUser from "@/actions/getCurrentUser";
import prismaClient from "@/libs/prismadb";
import { ErrorMessage, Message } from '@/responses/messages';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid'

interface RequestBody {
    team: any
    savedTeamPlayers: any[]
    reviewTeamPlayers: any[]
    shortUrl?: string
}

export async function POST(request: Request) {
    const { team, savedTeamPlayers, reviewTeamPlayers, shortUrl }: RequestBody = await request.json()
    const userSession = await getCurrentUser()

    try {
        let savedTeamPlayersArray: any[] = []
        let teamPlayersArray = Object.entries(savedTeamPlayers)
        let reviewPlayersArray = Object.entries(reviewTeamPlayers)

        //  Check if teamPlayers length is 11 players
        if (teamPlayersArray.length !== 11) {
            return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
        }

        // if (!!shortUrl) {
        //     const checkShortUrl = await prismaClient.savedTeam.findUnique({
        //         where: {
        //             shortUrl
        //         }
        //     })

        //     if (!!checkShortUrl) {
        //         return NextResponse.json(checkShortUrl, { status: 200 })
        //     }
        // }

        // Short url
        const genShortUrl = nanoid()

        const savedTeam = await prismaClient.savedTeam.create({
            data: {
                teamName: team.teamName,
                matchFormat: team.matchFormat,
                ...(team.venueId !== 'undefined' ? { venueId: team.venueId } : {}),
                teamAId: team.teamAId,
                teamBId: team.teamBId,
                shortUrl: genShortUrl,
                ...(!!userSession?.id ? { userId: userSession.id } : {})
            }
        })

        teamPlayersArray.forEach(player => {
            savedTeamPlayersArray.push({
                playerId: player[0],
                teamId: player[1],
                savedTeamId: savedTeam.id,
                status: 'selected'
            })
        })

        if (reviewPlayersArray.length > 0) {
            reviewPlayersArray.forEach(player => {
                savedTeamPlayersArray.push({
                    playerId: player[0],
                    teamId: player[1],
                    savedTeamId: savedTeam.id,
                    status: 'stared'
                })
            })
        }

        await prismaClient.savedTeamPlayers.createMany({
            data: savedTeamPlayersArray,
            skipDuplicates: true
        })

        return NextResponse.json(savedTeam, { status: 200 })
    } catch (error: any) {
        console.log(error)
        if (error.code === 'P2002') {
            return new NextResponse(ErrorMessage.DATA_EXISTS, { status: 500 })
        }
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}