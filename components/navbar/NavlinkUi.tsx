'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { ReactNode } from "react"

interface NavlinkUiProps {
    children: ReactNode
    linkto: string
    type?: string
}

const NavlinkUi: React.FC<NavlinkUiProps> = ({ children, linkto, type = 'default' }) => {
    if (type === 'navBtn') {
        return (
            <div className="px-6 py-8 border-t md:px-12 md:py-16 lg:border-t-0 lg:border-l lg:py-0 lg:pr-0 lg:pl-6">
                <Link href={linkto} className="block px-4 py-2 text-center text-white transition duration-300 rounded-full shadow-md bg-custom-alpha hover:bg-custom-beta hover:text-white">
                    {children}
                </Link>
            </div>
        )
    } else if (type === 'signout') {
        return (
            <li>
                <span onClick={() => signOut()} className="relative cursor-pointer group before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:bg-custom-light">
                    <span className="relative text-custom-alpha">{children}</span>
                </span>
            </li>
        )
    }

    return (
        <li>
            <Link href={linkto} className="relative group before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:bg-custom-light">
                <span className="relative text-custom-alpha">{children}</span>
            </Link>
        </li>
    )
}

export default NavlinkUi
