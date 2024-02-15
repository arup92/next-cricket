import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { getPlayerStats } from "@/utils/utils"
import { MatchFormat } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const teamA = url.searchParams.get('teamA')?.toString().toUpperCase()
    const teamB = url.searchParams.get('teamB')?.toString().toUpperCase()
    const matchFormat: MatchFormat = url.searchParams.get('matchFormat')?.toString().toUpperCase() as MatchFormat
    const venueId = url.searchParams.get('venueId')?.toString().toLowerCase()

    if (!teamA || !teamB || !matchFormat) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 401 })
    }

    try {
        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365)

        const teamBat = await prismaClient.batting.findMany({
            where: {
                OR: [
                    { teamId: teamA },
                    { teamId: teamB }
                ],
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat,
                Player: {
                    OR: [
                        { inactive: 'no' },
                        { inactive: null }
                    ]
                },
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
                    { teamId: teamA },
                    { teamId: teamB }
                ],
                oppCountryId: {
                    in: [
                        teamA, teamB
                    ]
                },
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat,
                Player: {
                    OR: [
                        { inactive: 'no' },
                        { inactive: null }
                    ]
                },
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
                    { teamId: teamA },
                    { teamId: teamB }
                ],
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat,
                Player: {
                    OR: [
                        { inactive: 'no' },
                        { inactive: null }
                    ]
                },
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
                    { teamId: teamA },
                    { teamId: teamB }
                ],
                oppCountryId: {
                    in: [
                        teamA, teamB
                    ]
                },
                matchDate: {
                    lte: new Date(),
                    gte: oneYearAgo
                },
                matchFormat,
                Player: {
                    OR: [
                        { inactive: 'no' },
                        { inactive: null }
                    ]
                },
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

        if (venueId) {
            teamBatInVenue = await prismaClient.batting.findMany({
                where: {
                    OR: [
                        { teamId: teamA },
                        { teamId: teamB }
                    ],
                    venueId,
                    matchDate: {
                        lte: new Date(),
                        gte: oneYearAgo
                    },
                    matchFormat,
                    Player: {
                        OR: [
                            { inactive: 'no' },
                            { inactive: null }
                        ]
                    },
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
                        { teamId: teamA },
                        { teamId: teamB }
                    ],
                    venueId,
                    matchDate: {
                        lte: new Date(),
                        gte: oneYearAgo
                    },
                    matchFormat,
                    Player: {
                        OR: [
                            { inactive: 'no' },
                            { inactive: null }
                        ]
                    },
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
                Player: {
                    inactive: 'no',
                },
                OR: [
                    { teamId: teamA },
                    { teamId: teamB }
                ],
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

        const stats = getPlayerStats({ teamBat, teamBowl, teamBatVsTeam, teamBowlVsTeam, teamBatInVenue, teamBowlInVenue })

        return NextResponse.json({ stats, ranks }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}