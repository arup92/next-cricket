import New11View from "@/components/view/New11View"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `New 11 | ${process.env.APP_NAME}`,
    description: 'New 11',
}

const New11 = () => {
    return (
        <New11View />
    )
}

export default New11
