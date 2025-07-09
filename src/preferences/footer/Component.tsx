import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/components/theme-provider/theme/themeselector'

export async function Footer() {
    const footerData: Footer = await getCachedGlobal('footer', 1)()

    const columns = footerData?.columns || []
    const copyright = footerData?.copyRight

    return (
        <footer className="mt-auto border-t border-border bg-background overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col gap-8 md:gap-12 py-8 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
                        {/* Logo Section */}
                        <div className="flex flex-col justify-start col-span-12 md:col-span-3">
                            <Link className="flex items-center w-fit" href="/">
                                <Logo className="invert-0 dark:invert" />
                            </Link>
                        </div>

                        {/* Navigation Section */}
                        <nav className="col-span-12 md:col-span-7">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
                                {columns?.map(({ label, navItems }, index) => {
                                    return (
                                        <div key={index} className="flex flex-col gap-5 min-w-0">
                                            <span className="text-base md:text-2xl font-bold text-foreground">
                                                {label}
                                            </span>
                                            <div className="flex flex-col gap-3">
                                                {navItems?.map(({ link }, j) => {
                                                    return (
                                                        <CMSLink
                                                            className="text-sm font-extralight text-foreground/80 hover:text-foreground/100 transition-colors duration-200 ease-in-out break-words"
                                                            key={j}
                                                            {...link}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </nav>

                        {/* Theme Section */}
                        <div className="flex flex-col gap-3 col-span-12 md:col-span-2">
                            <span className="text-base md:text-sm font-bold text-foreground">
                                Theming
                            </span>
                            <div className="w-full">
                                <ThemeSelector />
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="border-t border-border pt-6">
                        <p className="text-sm text-foreground/80 font-extralight">
                            {copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}