import prismaClient from "@/libs/prismadb"
import { ErrorMessage } from "@/responses/messages"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const playerId = url.searchParams.get('playerId')?.toString()

    if (!playerId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        const twoYearsAgo = new Date();
        twoYearsAgo.setDate(twoYearsAgo.getDate() - 730)

        // Player Table
        const allPlayerData = await prismaClient.player.findUnique({
            where: {
                playerId
            },
            include: {
                batting: {
                    where: {
                        matchDate: {
                            lte: new Date(),
                            gte: twoYearsAgo
                        },
                    },
                    include: {
                        Match: true,
                        venue: true,
                    }
                },
                bowling: {
                    where: {
                        matchDate: {
                            lte: new Date(),
                            gte: twoYearsAgo
                        },
                    },
                    include: {
                        Match: true,
                        venue: true,
                    }
                }
            }
        })

        const { batting, bowling, ...playerData } = allPlayerData as any

        return NextResponse.json({ playerData, batting, bowling }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}