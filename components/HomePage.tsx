'use client'
import NotFound404 from "@/app/not-found"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import CenteredArea from "./customUi/CenteredArea"
import RankFilterForm from "./forms/RankFilterForm"
import TeamRanking from "./ranking/TeamRanking"
import Loading from "@/app/loading"
import StatsTeamFormV2Compact from "./forms/StatsTeamFormV2Compact"

interface HomePageProps {
    slugs: any
}

const HomePage: React.FC<HomePageProps> = ({ slugs }) => {
    // React Query: Get Player List
    const getPlayerRankings = async (): Promise<any> => {
        return await axios.get(`/api/view/ranking?matchFormat=${slugs?.[0] || 'odi'}&team=${slugs?.[1] || 'all'}&view=${slugs?.[2] || '10'}&matchType=${slugs?.[3] || 'MEN'}`)
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log(err)
                throw new Error('Oh no!')
            })
    }

    // React Query
    const { data: plRankings, isError, isLoading } = useQuery({
        queryKey: ['playerRankings', slugs?.[0] || 'odi', slugs?.[1] || 'all', slugs?.[2] || '10', slugs?.[3] || 'MEN'],
        queryFn: getPlayerRankings
    })

    if (isError)
        return <NotFound404 />

    if (isLoading) return <Loading />

    return (
        <CenteredArea maxWidthClass="max-w-7xl">
            <div className="pb-5">
                <StatsTeamFormV2Compact />
            </div>

            <div className="px-5 py-3 mb-3 border rounded-md shadow-sm lg:items-center lg:justify-between lg:flex text-card-foreground bg-card">
                <div className="text-center">
                    <h2 className="inline-block mb-4 mr-auto text-lg font-bold lg:inline lg:text-2xl">Fantasy Players Rating</h2>
                </div>
                <RankFilterForm fields={slugs} />
            </div>

            {plRankings && plRankings.batting.length > 0 && <TeamRanking
                battingRanking={plRankings.batting}
                bowlingRanking={plRankings.bowling}
                handle={slugs?.[0] || 'odi'}
            />}
        </CenteredArea>
    )
}

export default HomePage
