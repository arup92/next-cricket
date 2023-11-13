'use client'

import { useState } from "react"
import StatsTeamForm from "../forms/StatsTeamForm"
import Head2Head from "./New11/Head2Head"
import Player11Bat from "./New11/Player11Bat"
import Player11Bowl from "./New11/Player11Bowl"


const New11View = () => {
    const [h2h, setH2h] = useState<any[]>([])
    const [sTeamA, setSTeamA] = useState<any>({})
    const [sTeamB, setSTeamB] = useState<any>({})
    const [new11bat, setNew11Bat] = useState<any>({})
    const [new11bowl, setNew11Bowl] = useState<any>({})

    // Update the table on form submission
    const handleData = (item: any): void => {
        // console.log(item)
        setSTeamA(item.sTeamA)
        setSTeamB(item.sTeamB)
        setH2h(item.h2h)
        setNew11Bat(item.new11bat)
        setNew11Bowl(item.new11bowl)
    }

    return (
        <>
            <StatsTeamForm handleData={handleData} />
            <Head2Head h2h={h2h} sTeamA={sTeamA} sTeamB={sTeamB} />
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
            </div>
        </>
    )
}

export default New11View
