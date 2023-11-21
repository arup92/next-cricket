'use client'

import { useState } from "react"
import StatsTeamForm from "../forms/StatsTeamForm"
import MatchResults from "./New11Card/MatchResults"
import TeamScores from "./New11Card/TeamScores"
import TeamWickets from "./New11Card/TeamWickets"
import Head2Head from "./New11Card/Head2Head"
import PlayerStats from "./New11Card/PlayerStats"
import { getFullNameByCode } from "@/utils/utils"

const New11View = () => {
    const [h2h, setH2h] = useState<any[]>([])
    const [sTeamA, setSTeamA] = useState<any>({})
    const [sTeamB, setSTeamB] = useState<any>({})
    const [playerData, setPlayerData] = useState<any>({})

    // Update the table on form submission
    const handleData = (item: any): void => {
        // console.log(item)
        setSTeamA(item.sTeamA)
        setSTeamB(item.sTeamB)
        setH2h(item.h2h)

        setPlayerData(item.new11)
    }

    return (
        <>
            <StatsTeamForm handleData={handleData} />
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-8 mb-4">
                <Head2Head className="col-span-2" h2h={h2h} />
                <MatchResults className="col-span-2" teamA={sTeamA} teamB={sTeamB} />
                <TeamScores className="col-span-2" teamA={sTeamA} teamB={sTeamB} />
                <TeamWickets className="col-span-2" teamA={sTeamA} teamB={sTeamB} />
            </div>

            <h2 className="text-xl text-center font-bold mb-4">{getFullNameByCode(sTeamA.team)}</h2>
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-8 mb-4">
                <PlayerStats className="col-span-2" playerData={playerData} teamId={sTeamA.team} oppCountryId={sTeamB.team} />
            </div>

            <h2 className="text-xl text-center font-bold mb-4">{getFullNameByCode(sTeamB.team)}</h2>
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-8">
                <PlayerStats className="col-span-2" playerData={playerData} teamId={sTeamB.team} oppCountryId={sTeamA.team} />
            </div>

            {/* <Head2Head h2h={h2h} sTeamA={sTeamA} sTeamB={sTeamB} />
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                {sTeamA.team && sTeamA.team && <>
                    <div>
                        <p className="text-center mb-3">{sTeamA.team} Batting</p>
                        <Player11Bat player11={new11bat[sTeamA.team]} matchFormat={new11bat.matchFormat} className="mb-5" />
                        <p className="text-center mb-3">{sTeamA.team} Bowling</p>
                        <Player11Bowl player11={new11bowl[sTeamA.team]} matchFormat={new11bowl.matchFormat} />
                    </div>

                    <div>
                        <p className="text-center mb-3">{sTeamB.team} Batting</p>
                        <Player11Bat player11={new11bat[sTeamB.team]} matchFormat={new11bat.matchFormat} className="mb-5" />
                        <p className="text-center mb-3">{sTeamB.team} Bowling</p>
                        <Player11Bowl player11={new11bowl[sTeamB.team]} matchFormat={new11bowl.matchFormat} />
                    </div>
                </>
                }
            </div> */}
        </>
    )
}

export default New11View
