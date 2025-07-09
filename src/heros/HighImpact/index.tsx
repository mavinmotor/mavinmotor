'use client'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useHeaderTheme } from '@/components/theme-provider/headertheme'
import { cn } from '@/utilities/utils'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
    const { setHeaderTheme } = useHeaderTheme()

    useEffect(() => {
        setHeaderTheme('dark')
    })

    return (
        <div
            className="relative -mt-[10.4rem] flex items-center justify-center overflow-hidden"
            data-theme="dark"
        >
            <div className="container mb-8 z-10 relative flex items-center justify-center">
                <div className="md:max-w-[66.5rem] md:text-center">
                    {richText && (
                        <RichText
                            className={cn(
                                'mb-6',
                                '[&>h1]:text-shadow-xs [&>h1]:font-black [&>h1]:text-3xl [&>h1]:md:text-5xl [&>h1:last-of-type]:text-amber-500',
                                '[&>p]:mt-1 [&>p]:max-w-2xl [&>p]:text-lg [&>p]:md:text-xl [&>p]:text-secondary-foreground/95 text-shadow-2xs',
                            )}
                            data={richText}
                            enableGutter={false}
                        />
                    )}
                    {Array.isArray(links) && links.length > 0 && (
                        <ul className="flex md:justify-center gap-4">
                            {links.map(({ link }, i) => {
                                return (
                                    <li key={i}>
                                        <CMSLink {...link} className='rounded-none md:px-9 h-12 [&>link]:bg-muted/55' />
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className="min-h-[80vh] select-none overflow-hidden">
                {media && typeof media === 'object' && (
                    <Media fill className="size-full" imgClassName="-z-10 object-cover" priority resource={media} />
                )}
                <div className="absolute pointer-events-none left-0 bottom-0 w-full h-5/6 bg-gradient-to-t from-background to-transparent" />
            </div>
        </div >
    )
}