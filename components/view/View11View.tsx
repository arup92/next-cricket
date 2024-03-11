'use client'

import Loading from "@/app/loading"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import PlayerStats from "./New11Card/PlayerStats"
import SavedPlayerStats from "./New11Card/SavedPlayerStats"
import NotFound404 from "@/app/not-found"
import NotFound from "../NotFound"

interface View11ViewProps {
    slugs: any
}

const View11View: React.FC<View11ViewProps> = ({ slugs }) => {
    const getCustomMatches = async (): Promise<any> => {
        return await axios.get(`/api/view/stats-view-11?savedTeamId=${slugs}`)
            .then(response => response.data)
            .catch(err => {
                console.log(err)
                return false
            })
    }

    // useQuery Get data
    const { data: teamData, isLoading } = useQuery({
        queryKey: ['matches', slugs],
        queryFn: getCustomMatches,
        enabled: slugs ? true : false
    })

    if (isLoading === true)
        return <>
            <Loading />
        </>

    if (!teamData)
        return <NotFound />


    return (
        <>
            {teamData && <>
                <h2 className="mb-4 text-xl font-bold text-center">
                    <Link
                        className="text-blue-700 hover:underline"
                        href={`/view/team/${teamData.savedTeam.teamA.teamId.toLowerCase()}/all/${teamData.savedTeam.matchFormat.toLowerCase()}`}
                    >
                        {teamData.savedTeam.teamA.teamName}
                    </Link>
                </h2>
                <div className="grid grid-cols-1 gap-3 mb-4 lg:grid-cols-8">
                    <SavedPlayerStats
                        className="col-span-2"
                        ranks={teamData.ranks}
                        playerData={teamData.stats}
                        teamId={teamData.savedTeam.teamA.teamId}
                        matchFormat={teamData.savedTeam.matchFormat}
                        oppCountryId={teamData.savedTeam.teamA.teamId}
                    />
                </div>
                <h2 className="mb-4 text-xl font-bold text-center">
                    <Link
                        className="text-blue-700 hover:underline"
                        href={`/view/team/${teamData.savedTeam.teamB.teamId.toLowerCase()}/all/${teamData.savedTeam.matchFormat.toLowerCase()}`}
                    >
                        {teamData.savedTeam.teamB.teamName}
                    </Link>
                </h2>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-8">
                    <SavedPlayerStats
                        className="col-span-2"
                        ranks={teamData.ranks}
                        playerData={teamData.stats}
                        teamId={teamData.savedTeam.teamB.teamId}
                        matchFormat={teamData.savedTeam.matchFormat}
                        oppCountryId={teamData.savedTeam.teamA.teamId}
                    />
                </div>
            </>}
        </>
    )
}

export default View11View
