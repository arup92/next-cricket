import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { getPlayerStats } from "@/utils/utils"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const savedTeamId = url.searchParams.get('savedTeamId')?.toString()

    try {
        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365)

        const savedTeam = await prismaClient.savedTeam.findUnique({
            where: {
                id: savedTeamId
            },
            include: {
                savedTeamPlayers: true,
                teamA: true,
                teamB: true
            }
        })

        if (!savedTeam) {
            return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
        }
        // Player Ids
        const playerIds: string[] = savedTeam.savedTeamPlayers.map(player => player.playerId)

        const teamBat = await prismaClient.batting.findMany({
            where: {
                OR: [
                    { teamId: savedTeam.teamAId },
                    { teamId: savedTeam.teamBId }
                ],
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat: savedTeam.matchFormat,
                playerId: { in: playerIds }
            },
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            select: {
                run: true,
                four: true,
                six: true,
                strikeRate: true,
                matchDate: true,
                oppCountryId: true,
                playerId: true,
                teamId: true,
                f11points: true,
                matchFormat: true,
                battingOrder: true,
                Match: {
                    select: {
                        id: true
                    }
                },
                Player: {
                    select: {
                        playerType: true,
                        bowlingType: true,
                    },
                },
                venue: {
                    select: {
                        venueName: true,
                        venueCountryId: true,
                        venueId: true,
                    }
                }
            },
            take: 440
        })

        const teamBatVsTeam = await prismaClient.batting.findMany({
            where: {
                OR: [
                    { teamId: savedTeam.teamAId },
                    { teamId: savedTeam.teamBId }
                ],
                oppCountryId: {
                    in: [
                        savedTeam.teamAId, savedTeam.teamBId
                    ]
                },
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat: savedTeam.matchFormat,
                playerId: { in: playerIds }
            },
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            select: {
                run: true,
                four: true,
                six: true,
                strikeRate: true,
                matchDate: true,
                oppCountryId: true,
                playerId: true,
                teamId: true,
                f11points: true,
                matchFormat: true,
                Match: {
                    select: {
                        id: true
                    }
                },
                venue: {
                    select: {
                        venueName: true,
                        venueCountryId: true,
                        venueId: true,
                    }
                }
            },
            take: 440
        })

        const teamBowl = await prismaClient.bowling.findMany({
            where: {
                OR: [
                    { teamId: savedTeam.teamAId },
                    { teamId: savedTeam.teamBId }
                ],
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat: savedTeam.matchFormat,
                playerId: { in: playerIds }
            },
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            select: {
                wicket: true,
                eco: true,
                maiden: true,
                matchDate: true,
                matchFormat: true,
                playerId: true,
                f11points: true,
                oppCountryId: true,
                teamId: true,
                bowlingOrder: true,
                Match: {
                    select: {
                        id: true
                    }
                },
                Player: {
                    select: {
                        playerType: true,
                        bowlingType: true,
                    }
                },
                venue: {
                    select: {
                        venueName: true,
                        venueCountryId: true,
                        venueId: true,
                    }
                }
            },
            take: 440
        })

        const teamBowlVsTeam = await prismaClient.bowling.findMany({
            where: {
                OR: [
                    { teamId: savedTeam.teamAId },
                    { teamId: savedTeam.teamBId }
                ],
                oppCountryId: {
                    in: [
                        savedTeam.teamAId, savedTeam.teamBId
                    ]
                },
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat: savedTeam.matchFormat,
                playerId: { in: playerIds }
            },
            orderBy: [
                { playerId: 'asc' },
                { matchDate: 'desc' },
            ],
            select: {
                wicket: true,
                eco: true,
                maiden: true,
                matchDate: true,
                matchFormat: true,
                playerId: true,
                f11points: true,
                oppCountryId: true,
                teamId: true,
                Match: {
                    select: {
                        id: true
                    }
                },
                venue: {
                    select: {
                        venueName: true,
                        venueCountryId: true,
                        venueId: true,
                    }
                }
            },
            take: 440
        })

        // Venue Data
        let teamBatInVenue: any[] = []
        let teamBowlInVenue: any[] = []

        if (savedTeam.venueId && savedTeam.venueId !== 'undefined') {
            teamBatInVenue = await prismaClient.batting.findMany({
                where: {
                    OR: [
                        { teamId: savedTeam.teamAId },
                        { teamId: savedTeam.teamBId }
                    ],
                    venueId: savedTeam.venueId,
                    matchDate: {
                        lte: new Date(),
                        gte: oneYearAgo
                    },
                    matchFormat: savedTeam.matchFormat,
                    playerId: { in: playerIds }
                },
                orderBy: [
                    { playerId: 'asc' },
                    { matchDate: 'desc' },
                ],
                select: {
                    run: true,
                    four: true,
                    six: true,
                    strikeRate: true,
                    matchDate: true,
                    oppCountryId: true,
                    playerId: true,
                    teamId: true,
                    f11points: true,
                    matchFormat: true,
                    Match: {
                        select: {
                            id: true
                        }
                    },
                    venue: {
                        select: {
                            venueName: true,
                            venueCountryId: true,
                            venueId: true,
                        }
                    }
                },
                take: 440
            })

            teamBowlInVenue = await prismaClient.bowling.findMany({
                where: {
                    OR: [
                        { teamId: savedTeam.teamAId },
                        { teamId: savedTeam.teamBId }
                    ],
                    venueId: savedTeam.venueId,
                    matchDate: {
                        lte: new Date(),
                        gte: oneYearAgo
                    },
                    matchFormat: savedTeam.matchFormat,
                    playerId: { in: playerIds }
                },
                orderBy: [
                    { playerId: 'asc' },
                    { matchDate: 'desc' },
                ],
                select: {
                    wicket: true,
                    eco: true,
                    maiden: true,
                    matchDate: true,
                    matchFormat: true,
                    playerId: true,
                    f11points: true,
                    oppCountryId: true,
                    teamId: true,
                    Match: {
                        select: {
                            id: true
                        }
                    },
                    venue: {
                        select: {
                            venueName: true,
                            venueCountryId: true,
                            venueId: true,
                        }
                    }
                },
                take: 440
            })
        }

        // Get ranks
        const ranks = await prismaClient.rank.findMany({
            where: {
                OR: [
                    { teamId: savedTeam.teamAId },
                    { teamId: savedTeam.teamBId }
                ],
                Match: {
                    matchFormat: savedTeam.matchFormat,
                },
                playerId: { in: playerIds }
            },
            select: {
                rank: true,
                playerId: true,
                matchId: true,
                teamId: true,
            },
            orderBy: {
                Match: {
                    matchDate: 'desc'
                }
            },
            take: 440
        })

        const stats = getPlayerStats({ teamBat, teamBowl, teamBatVsTeam, teamBowlVsTeam, teamBatInVenue, teamBowlInVenue, ranks })

        return NextResponse.json({ savedTeam, stats, ranks }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}