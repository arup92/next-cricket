import MatchesView from "@/components/view/MatchesView"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Matches | ${process.env.APP_NAME}`,
  description: 'View Matches',
}

const Matches = () => {
  return (
    <MatchesView />
  )
}

export default Matches
