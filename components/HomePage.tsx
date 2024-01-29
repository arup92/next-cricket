'use client'
import { getLastMatchesBattingSum, getLastMatchesBowlingSum } from "@/utils/dbRaw"
import TeamRanking from "./ranking/TeamRanking"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import CenteredArea from "./customUi/CenteredArea"

const HomePage = () => {
    // React Query: ODI
    const getODIRankings = async (): Promise<any> => {
        return await axios.get(`/api/view/ranking?matchFormat=ODI`)
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    // React Query
    const { data: odiRankings } = useQuery({
        queryKey: ['ODIRankings'],
        queryFn: getODIRankings
    })

    // React Query: ODI
    const getT20Rankings = async (): Promise<any> => {
        return await axios.get(`/api/view/ranking?matchFormat=T20`)
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    // React Query
    const { data: t20Rankings } = useQuery({
        queryKey: ['T20Rankings'],
        queryFn: getT20Rankings
    })

    return (
        <CenteredArea maxWidthClass="max-w-7xl">
            <div className="px-5 py-3 mb-5 border rounded-md shadow-sm text-card-foreground bg-card">
                <h2 className="inline mr-2 text-lg font-bold lg:text-2xl">ODI Players Rating</h2>
                <span className="text-xs text-muted-foreground lg:text-sm">(Recent 10 Matches)</span>
            </div>

            {odiRankings && odiRankings.batting.length > 0 && <TeamRanking
                battingRanking={odiRankings.batting}
                bowlingRanking={odiRankings.bowling}
                handle='odi'
            />}

            <div className="px-5 py-3 mb-5 border rounded-md shadow-sm text-card-foreground bg-card">
                <h2 className="inline mr-2 text-lg font-bold lg:text-2xl">T20 Players Rating</h2>
                <span className="text-xs text-muted-foreground lg:text-sm">(Recent 10 Matches)</span>
            </div>

            {t20Rankings && t20Rankings.batting.length > 0 && <TeamRanking
                battingRanking={t20Rankings.batting}
                bowlingRanking={t20Rankings.bowling}
                handle='t20'
            />}
        </CenteredArea>
    )
}

export default HomePage
