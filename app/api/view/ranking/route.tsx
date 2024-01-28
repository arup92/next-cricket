import { ErrorMessage } from "@/responses/messages"
import { getLastMatchesBattingSum, getLastMatchesBowlingSum } from "@/utils/dbRaw"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const matchFormat = url.searchParams.get('matchFormat')?.toString().toUpperCase()
    const numMatches: any = url.searchParams.get('numMatches')?.toString() || 10

    if (!matchFormat) {
        return new NextResponse(ErrorMessage.BAD_REQUEST, { status: 400 })
    }

    try {
        // DB Call
        const battingRankings: any = await getLastMatchesBattingSum(matchFormat, parseInt(numMatches))
        const bowlingRankings: any = await getLastMatchesBowlingSum(matchFormat, parseInt(numMatches))

        return NextResponse.json({ batting: battingRankings, bowling: bowlingRankings }, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(ErrorMessage.INT_SERVER_ERROR, { status: 500 })
    }
}