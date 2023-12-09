import CenteredArea from "@/components/customUi/CenteredArea"
import VenueStats from "@/components/view/VenueStats"
import { capitalizeFullName } from "@/utils/style"
import { Metadata } from "next"

type Props = {
    params: { venueid: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    let title = `${capitalizeFullName(params.venueid)} Most Recent Statstics | ${process.env.APP_NAME}`
    let description = `${capitalizeFullName(params.venueid)} Most Recent International Cricket Statstics | ${process.env.APP_NAME}`

    return {
        title,
        description
    }
}

const Venue = ({ params }: { params: { venueid: string } }) => {
    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            <VenueStats venue={params.venueid} />
        </CenteredArea>
    )
}

export default Venue
