import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const playerId = url.searchParams.get('playerId')?.toString()
    const teamId = url.searchParams.get('teamId')?.toString().split(',')
    const host = url.searchParams.get('host')?.toString()
    const innings = url.searchParams.get('innings')?.toString()
    const opponent = url.searchParams.get('opponent')?.toString()
    const venueId = url.searchParams.get('venueId')?.toString().toLowerCase()

    if (!playerId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        const twoYearsAgo = new Date();
        twoYearsAgo.setDate(twoYearsAgo.getDate() - 730)

        // Where Clause
        let whereClause: any = {
            matchDate: {
                lte: new Date(),
                gte: twoYearsAgo
            },
            ...((host !== 'null' && host !== undefined) ? {
                venue: {
                    venueCountryId: host
                }
            } : {}),
            ...((opponent !== 'null' && opponent !== undefined) ? { oppCountryId: opponent } : {}),
            ...((venueId !== 'null' && venueId !== undefined) ? { venueId } : {}),
        }

        let whereClauseBowl = {
            ...whereClause
        }

        if (innings !== 'null' && innings !== undefined) {
            if (innings === '2nd') {
                whereClause.Match = {
                    batFirst: {
                        not: {
                            in: teamId
                        }
                    }
                }

                whereClauseBowl.Match = {
                    batFirst: {
                        in: teamId
                    }
                }
            } else {
                whereClause.Match = {
                    batFirst: {
                        in: teamId
                    }
                }

                whereClauseBowl.Match = {
                    batFirst: {
                        not: {
                            in: teamId
                        }
                    }
                }
            }
        }

        // Player Table
        const allPlayerData = await prismaClient.player.findUnique({
            where: {
                playerId
            },
            include: {
                playerTeams: {
                    select: {
                        teamId: true,
                        team: {
                            select: {
                                teamType: true
                            }
                        }
                    }
                },
                batting: {
                    where: whereClause,
                    include: {
                        Match: true,
                        venue: true,
                    },
                    orderBy: {
                        matchDate: 'desc'
                    }
                },
                bowling: {
                    where: whereClauseBowl,
                    include: {
                        Match: true,
                        venue: true,
                    },
                    orderBy: {
                        matchDate: 'desc'
                    }
                }
            },
        })

        const { batting, bowling, ...playerData } = allPlayerData as any

        return NextResponse.json({ playerData, batting, bowling }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}