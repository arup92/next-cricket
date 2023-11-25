import CenteredArea from "@/components/customUi/CenteredArea"
import VenueStats from "@/components/view/VenueStats"

const Venue = ({ params }: { params: { venueid: string } }) => {
    return (
        <CenteredArea maxWidthClass="max-w-5xl">
            <VenueStats venue={params.venueid} />
        </CenteredArea>
    )
}

export default Venue
