'use client'


import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useHeaderTheme } from '@/components/theme-provider/headertheme'

interface HeaderClientProps {
    data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
    /* Storing the value in a useState to avoid hydration errors */
    const [theme, setTheme] = useState<string | null>(null)
    const { headerTheme, setHeaderTheme } = useHeaderTheme()
    const pathname = usePathname()

    useEffect(() => {
        setHeaderTheme(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerTheme])

    return (
        <header className="sticky top-0 z-20 backdrop-blur-3xl bg-black/45" {...(theme ? { 'data-theme': theme } : {})}>
            <div className={'container flex items-center justify-between h-16 gap-2'}>
                <div className={'flex gap-5 items-center'}>
                    <Link href="/">
                        <Logo loading="eager" priority="high" className="invert-0 dark:invert" />
                    </Link>
                </div>
                <HeaderNav data={data} />
            </div>
        </header>
    )
}