import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { cn } from '@/utilities/utils'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
    const { columns } = props

    return (
        <div className="container my-16">
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-5 md:gap-5">
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        const { enableLink, link, richText, size, isCarded } = col

                        return (
                            <div
                                className={cn(
                                    `col-span-4`,
                                    size === 'full' && 'lg:col-span-12',
                                    size === 'half' && 'lg:col-span-6',
                                    size === 'oneThird' && 'lg:col-span-4',
                                    size === 'twoThirds' && 'lg:col-span-8',
                                    {
                                        'md:col-span-2': size !== 'full',
                                    },
                                    isCarded && 'bg-card caret-card rounded-md p-5'
                                )}
                                key={index}
                            >
                                {richText && <RichText data={richText} enableGutter={false} />}

                                {enableLink && <CMSLink {...link} />}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}