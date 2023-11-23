'use client'

import { useState } from "react"
import StatsTeamForm from "../forms/StatsTeamForm"
import MatchResultsCard from "./New11Card/MatchResultsCard"
import TeamScoresCard from "./New11Card/TeamScoresCard"
import TeamWicketsCard from "./New11Card/TeamWicketsCard"
import Head2HeadCard from "./New11Card/Head2HeadCard"
import PlayerStats from "./New11Card/PlayerStats"
import { getFullNameByCode } from "@/utils/utils"
import VenueStatsCard from "./New11Card/VenueStatsCard"

const New11View = () => {
    const [h2h, setH2h] = useState<any[]>([])
    const [sTeamA, setSTeamA] = useState<any>({})
    const [sTeamB, setSTeamB] = useState<any>({})
    const [sVenue, setSVenue] = useState<any>({})
    const [playerData, setPlayerData] = useState<any>({})

    // Update the table on form submission
    const handleData = (item: any): void => {
        // console.log(item)
        setSTeamA(item.sTeamA)
        setSTeamB(item.sTeamB)
        setH2h(item.h2h)
        setPlayerData(item.new11)
        setSVenue(item.sVenue)
    }

    return (
        <>
            <StatsTeamForm handleData={handleData} />
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-8 mb-4">
                <Head2HeadCard className="col-span-2" h2h={h2h} />
                <MatchResultsCard className="col-span-2" teamA={sTeamA} teamB={sTeamB} />
                <TeamScoresCard className="col-span-2" teamA={sTeamA} teamB={sTeamB} />
                <TeamWicketsCard className="col-span-2" teamA={sTeamA} teamB={sTeamB} />
                <VenueStatsCard className="col-span-2" venueData={sVenue} />
            </div>

            <h2 className="text-xl text-center font-bold mb-4">{getFullNameByCode(sTeamA.team)}</h2>
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-8 mb-4">
                <PlayerStats className="col-span-2" playerData={playerData} teamId={sTeamA.team} oppCountryId={sTeamB.team} />
            </div>

            <h2 className="text-xl text-center font-bold mb-4">{getFullNameByCode(sTeamB.team)}</h2>
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-8">
                <PlayerStats className="col-span-2" playerData={playerData} teamId={sTeamB.team} oppCountryId={sTeamA.team} />
            </div>
        </>
    )
}

export default New11View
