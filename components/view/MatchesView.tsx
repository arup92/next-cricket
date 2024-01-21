'use client'

import axios from "axios";
import { useState } from "react";
import CenteredArea from "../customUi/CenteredArea";

import { useQuery } from "@tanstack/react-query";
import SearchTeamsForm from "../forms/SearchTeamsForm";
import MatchesTable from "./MatchesTable";
import toast from "react-hot-toast";

const MatchesView = () => {
    const [matches, setMatches] = useState<Matches[]>([])

    // React Query Functions
    const getMatches = async (): Promise<Matches[]> => {
        return await axios.get(`/api/view/matches-get`)
            .then(response => {
                setMatches(response.data as Matches[])
                return response.data
            })
            .catch(err => {
                console.log(err)
                return []
            })
    }

    // React Query
    const matchesQueryData = useQuery({
        queryKey: ['matches'],
        queryFn: getMatches
    })

    // Update the table on form submission
    const handleData = (item: any): void => {
        setMatches(item)
    }

    const deleteMatch = async (matchId: any) => {
        await axios.delete(`/api/dashboard/delete-match?matchId=${matchId.toString()}`)
            .then(response => {
                toast.success(response.data)
                setMatches(prevMatches => (
                    prevMatches.filter(match => match.id !== matchId)
                ))
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            <SearchTeamsForm handleData={handleData} />
            <MatchesTable matches={matches} deleteMatch={deleteMatch} />
        </CenteredArea>
    )
}

export default MatchesView
