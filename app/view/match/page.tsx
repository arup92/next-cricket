import MatchTable from "@/components/view/MatchTable"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `Match | ${process.env.APP_NAME}`,
    description: 'View Match',
}

const Match = () => {
    return (
        <MatchTable />
    )
}

export default Match
