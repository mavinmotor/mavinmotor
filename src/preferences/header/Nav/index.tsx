'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/utils'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
    const navItems = data?.navItems || []

    return (
        <nav className={'items-center gap-3 hidden lg:flex'}>
            {navItems.map(({ link }, i) => {
                return <CMSLink
                    key={i} {...link}
                    appearance={"inline"}
                    className={cn('text-secondary-foreground/55 hover:text-secondary-foreground/85')}
                />
            })}
        </nav>
    )
}