import View11View from "@/components/view/View11View"
import prismaClient from "@/libs/prismadb"
import { Metadata } from "next"
import { cache } from "react"

type Props = {
    params: { slugs: any }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    let title = `Saved team | ${process.env.APP_NAME}`

    return {
        title,
        description: title
    }
}

const View11 = async ({ params }: { params: { slugs: string } }) => {
    return (
        <View11View slugs={params.slugs} />
    )
}

export default View11
