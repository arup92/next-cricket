'use client'

import Loading from "@/app/loading"
import { getFullNameByCode } from "@/utils/utils"
import { useState } from "react"
import StatsTeamFormV2 from "../forms/StatsTeamFormV2"
import Head2HeadCard from "./New11Card/Head2HeadCard"
import MatchResultsCard from "./New11Card/MatchResultsCard"
import PlayerStats from "./New11Card/PlayerStats"
import TeamScoresCard from "./New11Card/TeamScoresCard"
import TeamWicketsCard from "./New11Card/TeamWicketsCard"
import VenueStatsCard from "./New11Card/VenueStatsCard"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

interface New11ViewV2Props {
    slugs: any
}

const New11ViewV2: React.FC<New11ViewV2Props> = ({ slugs }) => {
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
        return <StatsTeamFormV2 />
    }

    if (isLoading === true)
        return <>
            <StatsTeamFormV2 />
            <Loading />
        </>

    return (
        <>
            {data && <>
                <StatsTeamFormV2 />
                <Head2HeadCard className="mb-4" h2h={data.h2h} />
                <div className="grid gap-3 grid-cols-1 lg:grid-cols-8 mb-4">
                    <MatchResultsCard className="col-span-2" teamA={data.sTeamA} teamB={data.sTeamB} />
                    <TeamScoresCard className="col-span-2" teamA={data.sTeamA} teamB={data.sTeamB} />
                    <TeamWicketsCard className="col-span-2" teamA={data.sTeamA} teamB={data.sTeamB} />
                    <VenueStatsCard className="col-span-2" venueData={data.sVenue} />
                </div>
                <h2 className="text-xl text-center font-bold mb-4">{getFullNameByCode(data.sTeamA.team)}</h2>
                <div className="grid gap-3 grid-cols-1 lg:grid-cols-8 mb-4">
                    <PlayerStats className="col-span-2" playerData={data.new11} teamId={data.sTeamA.team} oppCountryId={data.sTeamB.team} />
                </div>
                <h2 className="text-xl text-center font-bold mb-4">{getFullNameByCode(data.sTeamB.team)}</h2>
                <div className="grid gap-3 grid-cols-1 lg:grid-cols-8">
                    <PlayerStats className="col-span-2" playerData={data.new11} teamId={data.sTeamB.team} oppCountryId={data.sTeamA.team} />
                </div>
            </>}
        </>
    )
}

export default New11ViewV2
