import Link from "next/link"
import { ReactNode } from "react"

interface AnchorProps {
    children: ReactNode
    linkTo: string
}

const Anchor: React.FC<AnchorProps> = ({ children, linkTo }) => {
    return (
        <Link href={linkTo} className="font-semibold transition duration-300">
            {children}
        </Link>
    )
}

export default Anchor
