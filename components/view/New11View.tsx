'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import StatsTeamForm from "../forms/StatsTeamForm"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

interface ResponseData {
    h2h: []
    team: {}
}

const New11View = () => {
    const router = useRouter()
    const getHeadToHead = async () => {
        try {
            let data = {
                h2h: [],
                team: {}
            }

            const [h2hResponse, teamResponse] = await Promise.all([
                axios.get(`/api/view/stats-h2h?teamA=AUS&teamB=afg`),
                axios.get(`/api/view/stats-team?teamA=AUS`)
            ])

            data.h2h = h2hResponse.data
            data.team = teamResponse.data
            return data
        } catch (error) {
            console.error(error)
            return []
        }
    }

    let { data } = useQuery({
        queryKey: ["MatchesH2H"],
        queryFn: getHeadToHead
    })

    data = data as ResponseData | undefined

    // Update the table on form submission
    const handleData = (item: any): void => {
        console.log(item)
    }

    return (
        <>
            <StatsTeamForm handleData={handleData} />
            {data?.h2h && <Card className="mb-6">
                <CardContent className="py-3">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-semibold text-sm">
                                AFG
                                <span className="text-sm text-muted-foreground capitalize"> (Last 5 Matches)</span>
                            </p>
                            <p className="text-sm text-muted-foreground capitalize"></p>
                        </div>

                        <div>
                            <p className="font-semibold text-sm">Head to Head</p>
                            <p className="text-sm text-muted-foreground capitalize">{data?.h2h?.map((item: { result: string }) => item.result)}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-sm">
                                AUS
                                <span className="text-sm text-muted-foreground capitalize"> (Last 5 Matches)</span>
                            </p>
                            <p className="text-sm text-muted-foreground capitalize"></p>
                        </div>

                        <div>
                            <Button variant={"default"} onClick={() => { router.back() }}>Back</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    )
}

export default New11View
