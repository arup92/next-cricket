import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="relative z-30">
            <div className="relative z-20 bg-white border-t">
                <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 py-4">
                    <Link href="/page/about" className='mr-3 hover:text-blue-600 hover:underline'>About us</Link>
                    <Link href="/page/contact" className='mr-3 hover:text-blue-600 hover:underline'>Contact us</Link>
                    <Link href="/page/privacy-policy" className='mr-3 hover:text-blue-600 hover:underline'>Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
