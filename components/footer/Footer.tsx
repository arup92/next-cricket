import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="relative z-30">
            <div className="relative z-20 bg-white border-t">
                <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 py-4">
                    <Link href="/page/about">About us</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
