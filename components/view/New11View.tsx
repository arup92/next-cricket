'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const New11View = () => {
    const getNew11Stats = () => {
        return axios.get(`/api/view/stats-hth?teamA=AUS&teamB=afg`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
                return []
            })
    }

    const View11Stats = useQuery({
        queryKey: ["New11Stats"],
        queryFn: getNew11Stats
    })

    return (
        <div>

        </div>
    )
}

export default New11View
