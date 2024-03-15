import CenteredArea from "@/components/customUi/CenteredArea"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `Contact us | ${process.env.APP_NAME}`,
    description: `Contact us for any questions or feedback | ${process.env.NEXT_PUBLIC_APP_URL}`,
}

const page = () => {
    return (
        <CenteredArea maxWidthClass="max-w-3xl">
            <div className="bg-white px-4 py-2 border rounded-sm">
                <h1 className="font-bold text-3xl mb-4">Contact Us</h1>
                <p className="mb-3">
                    Have questions or feedback? We&apos;d love to hear from you!
                </p>

                <p className="mb-3">
                    Email: <a className="text-blue-600" href="mailto:contact@fantasy11.club">contact@fantasy11.club</a>
                </p>

                <p className="mb-3">
                    Address: Banamalipur, Agartala, West Tripura, India
                </p>
            </div>
        </CenteredArea >
    )
}

export default page
