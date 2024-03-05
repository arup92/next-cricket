'use client'
import { getLastMatchesBattingSum, getLastMatchesBowlingSum } from "@/utils/dbRaw"
import TeamRanking from "./ranking/TeamRanking"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import CenteredArea from "./customUi/CenteredArea"
import RankFilterForm from "./forms/RankFilterForm"
import { useEffect, useState } from "react"

const HomePage = () => {
    const [playerList, setPlayerList] = useState<any[]>([])

    // React Query: ODI
    const getPlayerRankings = async (): Promise<any> => {
        if (playerList.length !== 0) {
            return playerList
        }

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
    const { data: odiRankings, refetch } = useQuery({
        queryKey: ['playerRankings'],
        queryFn: getPlayerRankings
    })

    // Update the playerList
    const updateList = (playerList: any[]) => {
        setPlayerList(playerList)
    }

    // Refetch after playerList updates
    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerList])

    return (
        <CenteredArea maxWidthClass="max-w-7xl">
            <div className="flex items-center justify-between px-5 py-3 mb-5 border rounded-md shadow-sm text-card-foreground bg-card">
                <h2 className="inline mr-2 text-lg font-bold lg:text-2xl">Fantasy Players Rating</h2>
                <RankFilterForm updatePlayers={updateList} />
            </div>

            {odiRankings && odiRankings.batting.length > 0 && <TeamRanking
                battingRanking={odiRankings.batting}
                bowlingRanking={odiRankings.bowling}
                handle='odi'
            />}
        </CenteredArea>
    )
}

export default HomePage
