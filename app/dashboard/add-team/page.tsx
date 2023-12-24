import AddTeamForm from "@/components/forms/AddTeamForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `Add Team | ${process.env.APP_NAME}`,
    description: 'Add a Team',
}

const AddTeam = () => {
    return (
        <AddTeamForm />
    )
}

export default AddTeam
