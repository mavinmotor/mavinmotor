'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const EndNav: React.FC = ({ }) => {
    return (
        <nav className={'ml-auto flex items-center gap-2 md:flex-1 md:justify-end'}>
            <Link href="/search">
                <span className="sr-only">Search</span>
                <SearchIcon className="w-5 text-primary" />
            </Link>
        </nav>
    )
}