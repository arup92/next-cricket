'use client'
import { getFullNameByCode } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CenteredArea from "../customUi/CenteredArea";
import BattingData from "./match/BattingData";
import BowlingData from "./match/BowlingData";
import MatchData from "./match/MatchData";
import { useEffect } from "react";

const MatchTable = () => {
    const searchParams = useSearchParams()
    const matchId = searchParams.get('matchId')

    const getMatch = async (): Promise<any> => {
        return await axios.get(`/api/view/match-get?matchId=${matchId}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error)
                return {}
            })
    }

    const { data } = useQuery({
        queryKey: ['match', matchId],
        queryFn: getMatch
    })

    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            {data && <div>
                <MatchData data={data.match} />
                <h1 className="mb-3 text-center font-bold">{getFullNameByCode(data.match.teamAId)} Batting</h1>
                <BattingData data={data.batting.battingA} />
                <h1 className="my-3 text-center font-bold">{getFullNameByCode(data.match.teamBId)} Batting</h1>
                <BattingData data={data.batting.battingB} />
                <h1 className="my-3 text-center font-bold">{getFullNameByCode(data.match.teamAId)} Bowling</h1>
                <BowlingData data={data.bowling.bowlingA} />
                <h1 className="my-3 text-center font-bold">{getFullNameByCode(data.match.teamBId)} Bowling</h1>
                <BowlingData data={data.bowling.bowlingB} />
            </div>}
        </CenteredArea>
    )
}

export default MatchTable
