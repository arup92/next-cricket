import AddMatchForm from "@/components/forms/AddMatchForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `Add Match | ${process.env.APP_NAME}`,
    description: 'Add a Match',
}

const AddMatch = () => {
    return (
        <AddMatchForm />
    )
}

export default AddMatch
