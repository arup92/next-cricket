'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MdOutlineSearch } from 'react-icons/md';

export const formSchema = z.object({
    term: z.string().trim().min(2),
})

interface FormSchemaProps {
    displayMobile: string
    width?: string
    fref?: any
}

const SearchForm: React.FC<FormSchemaProps> = ({ displayMobile, width, fref }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<any>()
    const [searchTerm, setSearchTerm] = useState<string>('')

    const {
        handleSubmit,
        setValue,
        watch
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(formSchema),
        defaultValues: {
            term: '',
        }
    })

    // Search
    const search = async (value: any) => {
        if (!!value.term && value.term.length >= 2) {
            setIsLoading(true)
            await axios.get(`/api/view/search?term=${value.term}`)
                .then(response => {
                    setSearchResults(response.data)
                })
                .catch(err => {
                    console.log(err)
                    return []
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    // Search on change
    let searchTimeout: NodeJS.Timeout | undefined
    const searchOnChange = async (value: any) => {
        setSearchTerm(value)
        if (!!value && value.length >= 2) {

            // Clear the previous timeout (if any)
            if (searchTimeout != null) clearTimeout(searchTimeout)

            // Search for tags
            searchTimeout = setTimeout(async () => {
                setIsLoading(true)
                await axios.get(`/api/view/search?term=${value}`)
                    .then(response => {
                        setSearchResults(response.data)
                    })
                    .catch(err => {
                        console.log(err)
                        return []
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            }, 500)

        } else {
            setSearchResults('')
        }
    }

    // Set search value to the input
    const setSearch = (value?: string) => {
        if (!!value) {
            setValue('term', value)
            setSearchTerm(value)
        }

        setSearchResults('')
    }

    // Clear Search Suggestions
    const clearSearch = () => {
        setTimeout(() => {
            setSearchResults('')
        }, 100)
    }

    const handleFocus = (e: any) => {
        e.target.select()
    }

    return (
        <div className={`relative ${width} lg:w-[400px]`}>
            <form className={`${displayMobile} lg:flex lg:justify-between`} onSubmit={handleSubmit(search)} autoComplete="off">
                <div className="w-full">
                    <Input
                        value={searchTerm}
                        className="w-full rounded-r-none"
                        placeholder="Search"
                        type="text"
                        ref={fref}
                        onChange={(e) => searchOnChange(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={clearSearch}
                    />
                    <span className="clear"></span>
                </div>

                <Button className="rounded-l-none" disabled={isLoading}>
                    <MdOutlineSearch className="text-xl" />
                </Button>
            </form>

            {searchResults && <div className="absolute z-20 w-full bg-white rounded-sm shadow">
                {searchResults.player.length > 0 &&
                    searchResults.player.map((player: any) =>
                        <Link
                            key={player.playerId}
                            href={`/view/player/${player.playerId.toLowerCase()}`}
                            onClick={() => setSearch(player.playerName)}
                        >
                            <span className="flex items-center justify-between w-full px-2 py-1 capitalize hover:bg-gray-100">
                                {player.playerName}
                                <span className="px-1 py-0 text-xs text-white bg-black rounded-sm shadow">Player</span>
                            </span>
                        </Link>)
                }

                {searchResults.team.length > 0 &&
                    searchResults.team.map((team: any) =>
                        <Link
                            key={team.teamId}
                            href={`/view/team/${team.teamId.toLowerCase()}`}
                            onClick={() => setSearch(team.teamName)}
                        >
                            <span className="flex items-center justify-between w-full px-2 py-1 capitalize hover:bg-gray-100">
                                {team.teamName}
                                <span className="px-1 py-0 text-xs text-white bg-black rounded-sm shadow">Team</span>
                            </span>
                        </Link>)
                }

                {searchResults.venue.length > 0 &&
                    searchResults.venue.map((venue: any) =>
                        <Link
                            key={venue.venueId}
                            href={`/view/venue/${venue.venueId.toLowerCase()}`}
                            onClick={() => setSearch(venue.venueName)}
                        >
                            <span className="flex items-center justify-between w-full px-2 py-1 capitalize hover:bg-gray-100">
                                {venue.venueName}
                                <span className="px-1 py-0 text-xs text-white bg-black rounded-sm shadow">Venue</span>
                            </span>
                        </Link>)
                }
            </div>}
        </div>
    )
}

export default SearchForm
