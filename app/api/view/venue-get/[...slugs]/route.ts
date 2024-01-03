import prismaClient from "@/libs/prismadb";
import { ErrorMessage } from "@/responses/messages";
import { MatchFormat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slugs: string } }) {
    const venueId = params.slugs[0].toLowerCase()
    const matchFormat = params.slugs[1]

    if (!venueId) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    // Construct where clause
    let where = {}
    if (!!matchFormat) {
        where = {
            matchFormat: matchFormat.toUpperCase() as MatchFormat
        }
    }

    try {
        const venueData = await prismaClient.venue.findUnique({
            where: {
                venueId,
            },
            select: {
                venueId: true,
                venueName: true,
                venueCountryId: true,
                matches: {
                    where,
                    select: {
                        matchFormat: true,
                        teamAId: true,
                        teamBId: true,
                        result: true,
                        batFirst: true,
                        matchDate: true,
                        id: true,
                        batting: {
                            select: {
                                run: true
                            }
                        },
                        bowling: {
                            select: {
                                eco: true,
                                wicket: true,
                                Player: true
                            }
                        },
                        Scores: true,
                    },
                    take: 10,
                    orderBy: {
                        matchDate: 'desc'
                    }
                }
            },
        })

        return NextResponse.json(venueData, { status: 200 })
    } catch (error) {
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}