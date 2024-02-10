'use client'

import Loading from "@/app/loading"
import { MatchFormat } from "@/types/MatchFormat"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import NotFound from "../NotFound"
import StatsTeamFormV2 from "../forms/StatsTeamFormV2"
import { Badge } from "../ui/badge"
import Head2HeadCard from "./New11Card/Head2HeadCard"
import MatchResultsCard from "./New11Card/MatchResultsCard"
import PlayerStats from "./New11Card/PlayerStats"
import TeamScoresCard from "./New11Card/TeamScoresCard"
import TeamWicketsCard from "./New11Card/TeamWicketsCard"
import VenueStatsCard from "./New11Card/VenueStatsCard"
import { Button } from "../ui/button"

interface New11ViewV2Props {
    slugs: any
    teams: any
}

const New11ViewV2: React.FC<New11ViewV2Props> = ({ slugs, teams }) => {
    const [pickedPlayers, setPickedPlayers] = useState<any>({})

    const getCustomMatches = async (): Promise<any> => {
        return await axios.all([
            axios.get(`/api/view/stats-h2h?teamA=${slugs[0]}&teamB=${slugs[1]}&matchFormat=${slugs[2]}&venueId=${slugs[3]}`),
            axios.get(`/api/view/stats-team?team=${slugs[0]}&matchFormat=${slugs[2]}`),
            axios.get(`/api/view/stats-team?team=${slugs[1]}&matchFormat=${slugs[2]}`),
            axios.get(`/api/view/stats-new-11?teamA=${slugs[0]}&teamB=${slugs[1]}&matchFormat=${slugs[2]}&venueId=${slugs[3]}`),
            axios.get(`/api/view/stats-venue?venueId=${slugs[3]}&matchFormat=${slugs[2]}`),
        ]).then(axios.spread((h2h, sTeamA, sTeamB, new11, sVenue) => {
            return {
                h2h: h2h.data,
                sTeamA: sTeamA.data,
                sTeamB: sTeamB.data,
                new11: new11.data,
                sVenue: sVenue.data
            }
        })).catch(err => {
            console.log(err)
            return []
        })
    }

    // useQuery on form submit
    const { data, isLoading } = useQuery({
        queryKey: ['matches', slugs],
        queryFn: getCustomMatches,
        enabled: slugs ? true : false
    })

    if (!slugs) {
        return <div className="sm:max-w-[425px] mx-auto my-0">
            <StatsTeamFormV2 slugs={slugs} />
        </div>
    } else if (!!slugs) {
        // 404
        if (
            !slugs[0] || !slugs[1]
            || !MatchFormat.includes(slugs[2].toUpperCase())
        ) {
            return <>
                <NotFound />
            </>
        }
    }

    if (isLoading === true)
        return <>
            <Loading />
        </>

    // Handle Picks
    const handlePicks = (picks: any) => {
        const _pickedPlayers: any = {}
        if (Object.keys(picks).length === 0) {
            setPickedPlayers({})
            return
        }

        Object.entries(picks).forEach(item => {
            const value: string = item[1] as string

            if (_pickedPlayers.hasOwnProperty(value)) {
                _pickedPlayers[value] = _pickedPlayers[value] + 1
            } else {
                _pickedPlayers[value] = 1
            }

            setPickedPlayers(_pickedPlayers)
        })
    }

    return (
        <>
            {data && <>

                <Head2HeadCard className="mb-4" h2h={data.h2h} />
                <div className="grid grid-cols-1 gap-3 mb-4 lg:grid-cols-8">
                    <MatchResultsCard className="col-span-2" teamA={data.sTeamA} teamB={data.sTeamB} />
                    <TeamScoresCard className="col-span-2" matchFormat={slugs[2]} teamA={data.sTeamA} teamB={data.sTeamB} />
                    <TeamWicketsCard className="col-span-2" teamA={data.sTeamA} teamB={data.sTeamB} />
                    <VenueStatsCard className="col-span-2" venueData={data.sVenue} />
                </div>
                <h2 className="mb-4 text-xl font-bold text-center">
                    <Link
                        className="text-blue-700 hover:underline"
                        href={`/view/team/${data.sTeamA.team.toLowerCase()}${['odi', 't20'].includes(slugs[2].toLowerCase()) ? `/all/${slugs[2].toLowerCase()}` : ``}`}
                    >
                        {teams[0].teamId.toLowerCase() === data.sTeamA.team.toLowerCase() ?
                            teams[0].teamName
                            :
                            teams[1].teamName
                        }
                    </Link>
                </h2>
                <div className="grid grid-cols-1 gap-3 mb-4 lg:grid-cols-8">
                    <PlayerStats
                        className="col-span-2"
                        playerData={data.new11}
                        teamId={data.sTeamA.team}
                        oppCountryId={data.sTeamB.team}
                        matchFormat={slugs[2]}
                        handleSendPicks={handlePicks}
                    />
                </div>
                <h2 className="mb-4 text-xl font-bold text-center">
                    <Link
                        className="text-blue-700 hover:underline"
                        href={`/view/team/${data.sTeamB.team.toLowerCase()}${['odi', 't20'].includes(slugs[2].toLowerCase()) ? `/all/${slugs[2].toLowerCase()}` : ``}`}
                    >
                        {teams[1].teamId.toLowerCase() === data.sTeamB.team.toLowerCase() ?
                            teams[1].teamName
                            :
                            teams[0].teamName
                        }
                    </Link>
                </h2>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-8">
                    <PlayerStats
                        className="col-span-2"
                        playerData={data.new11}
                        teamId={data.sTeamB.team}
                        matchFormat={slugs[2]}
                        oppCountryId={data.sTeamA.team}
                        handleSendPicks={handlePicks}
                    />
                </div>


                {pickedPlayers && <div className="bg-secondary shadow-sm px-2 rounded py-1 text-center fixed bottom-3 left-1/2 -translate-x-[50%] z-50">{Object.entries(pickedPlayers).map(item => {
                    return <Badge key={item[0]} className="relative rounded-sm mr-4 px-3 py-1 bg-white text-slate-900 hover:bg-white">
                        {item[0]}
                        <span
                            className={`absolute -top-3 -right-3 text-center text-xs border-2 rounded-full text-white border-white ${parseInt(item[1] as string) <= 7 ? 'bg-emerald-600' : 'bg-red-500'} shadow-md w-5 h-5 grid items-center`}
                        >
                            {item[1] as string}
                        </span>
                    </Badge>
                })}
                    <Badge className="relative rounded-sm px-3 py-1 cursor-pointer">
                        Save
                    </Badge>
                </div>}
            </>}
        </>
    )
}

export default New11ViewV2
