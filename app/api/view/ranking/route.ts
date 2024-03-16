import { ErrorMessage } from "@/responses/messages"
import { getLastMatchesBattingSum, getLastMatchesBowlingSum } from "@/utils/dbRaw"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    let matchFormat: string = url.searchParams.get('matchFormat')?.toString().toUpperCase() || 'ODI'
    const numMatches: any = url.searchParams.get('numMatches')?.toString() || 10
    const limit: any = url.searchParams.get('view')?.toString() || 10
    let team: any = url.searchParams.get('team')?.toString() || null

    if (matchFormat === 'index') {
        matchFormat = 'ODI'
    }

    team = (team === 'all' ? null : team.toUpperCase())

    try {
        // DB Call
        const battingRankings: any = await getLastMatchesBattingSum(matchFormat, parseInt(numMatches), parseInt(limit), team)
        const bowlingRankings: any = await getLastMatchesBowlingSum(matchFormat, parseInt(numMatches), parseInt(limit), team)

        return NextResponse.json({ batting: battingRankings, bowling: bowlingRankings }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}