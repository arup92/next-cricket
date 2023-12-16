'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CenteredArea from "../customUi/CenteredArea";
import BattingData from "./match/BattingData";
import BowlingData from "./match/BowlingData";
import MatchData from "./match/MatchData";

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

    console.log(data);


    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            {data && <div className="space-y-5">
                <MatchData scores={data.scores} data={data.match} />
                <BattingData
                    score={data.scores[0].runs}
                    wickets={data.scores[1].wickets}
                    teamId={data.scores[0].teamId}
                    data={data.batting.battingA}
                />

                <BowlingData data={data.bowling.bowlingB} />

                <BattingData
                    score={data.scores[1].runs}
                    wickets={data.scores[0].wickets}
                    teamId={data.scores[1].teamId}
                    data={data.batting.battingB}
                />

                <BowlingData data={data.bowling.bowlingA} />
            </div>}
        </CenteredArea>
    )
}

export default MatchTable
