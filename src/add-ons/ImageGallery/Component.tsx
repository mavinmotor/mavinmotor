import type { StaticImageData } from 'next/image'

import React from 'react'

import type { ImageGalleryBlock as ImageGalleryProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { cn } from '@/utilities/utils'

type Props = ImageGalleryProps & {
    breakout?: boolean
    captionClassName?: string
    className?: string
    enableGutter?: boolean
    imgClassName?: string
    staticImage?: StaticImageData
    disableInnerContainer?: boolean
}

export const GalleryBlock: React.FC<Props> = (props) => {
    const { gallery, staticImage, imgClassName, className } = props

    return (
        <div
            className={cn(
                'grid grid-cols-4 lg:grid-cols-12 gap-5 md:gap-5',
                className
            )}
        >
            {gallery && gallery?.map((item, index) => {
                const { id, grid, media } = item

                const mediaProps = typeof media == "object" && media
                if (!mediaProps) return

                return (
                    <div className={cn(
                        `col-span-4`,
                        grid === 'full' && 'lg:col-span-12',
                        grid === 'half' && 'lg:col-span-6',
                        grid === 'oneThird' && 'lg:col-span-4',
                        grid === 'twoThirds' && 'lg:col-span-8',
                        {
                            'md:col-span-2': grid !== 'full',
                        },
                    )}>
                        {(media || staticImage) && (
                            <Media
                                imgClassName={cn('w-full rounded-[0.8rem]', imgClassName)}
                                resource={media}
                                src={staticImage}
                            />
                        )}
                    </div>
                )
            })}

        </div>
    )
}