'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const EndNav: React.FC = ({ }) => {
    return (
        <nav className={'ml-auto flex items-center gap-2 md:flex-1 md:justify-end'}>
            <Link href="/search" className='relative flex gap-2 items-center justify-end px-3 h-8 bg-input/35 rounded-full'>
                <span className="sr-only">Search</span>
                <span className="">Search</span>
                <SearchIcon className="w-5 text-primary" />
            </Link>
        </nav>
    )
}