import CenteredArea from "@/components/customUi/CenteredArea"
import VenueStats from "@/components/view/VenueStats"
import { capitalizeFullName } from "@/utils/style"
import { Metadata } from "next"

type Props = {
    params: { slugs: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    let title = `${capitalizeFullName(params.slugs[0]).replaceAll('-', ' ')} Most Recent Statstics | ${process.env.APP_NAME}`
    let description = `${capitalizeFullName(params.slugs[0]).replaceAll('-', ' ')} Most Recent International Cricket Statstics | ${process.env.APP_NAME}`

    return {
        title,
        description
    }
}

const Venue = ({ params }: { params: { slugs: string } }) => {
    return (
        <CenteredArea maxWidthClass="max-w-6xl">
            <VenueStats venue={params.slugs[0]} matchFormat={params.slugs[1]} />
        </CenteredArea>
    )
}

export default Venue
