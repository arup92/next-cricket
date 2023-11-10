'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import CenteredArea from "../customUi/CenteredArea";

import { useQuery } from "@tanstack/react-query";
import SearchTeamsForm from "../forms/SearchTeamsForm";
import MatchesTable from "./MatchesTable";

const MatchesView = () => {
    const [matches, setMatches] = useState<Matches[]>([])

    // React Query Functions
    const getMatches = async (): Promise<Matches[]> => {
        return await axios.get(`/api/view/matches-get`)
            .then(response => {
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
    useEffect(() => {
        setMatches(matchesQueryData.data as Matches[])
    }, [matchesQueryData.data])

    // Update the table on form submission
    const handleData = (item: any): void => {
        setMatches(item)
    }

    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            <SearchTeamsForm handleData={handleData} />
            <MatchesTable matches={matches} />
        </CenteredArea>
    )
}

export default MatchesView
