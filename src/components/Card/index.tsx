'use client'

import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/utils'
import useClickableCard from '@/utilities/useClickableCard'
import { Badge } from '../ui/badge'

export type CardProductData = Pick<Product, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
    alignItems?: 'center'
    className?: string
    doc?: CardProductData
    relationTo?: 'products'
    showCategories?: boolean
    title?: string
}> = (props) => {
    const { card, link } = useClickableCard({})
    const { className, doc, relationTo = "products", showCategories, title: titleFromProps } = props

    const { slug, categories, meta, title } = doc || {}
    const { description, image: metaImage } = meta || {}

    const hasCategories = categories && Array.isArray(categories) && categories.length > 0
    const titleToUse = titleFromProps || title
    const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
    const href = `/${relationTo}/${slug}`

    return (
        <article
            className={cn(
                'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
                className,
                relationTo == "products" && 'border-0 touch-auto shadow-2xl backdrop-blur-3xl h-fit hover:scale-105 delay-75'
            )}
            ref={card.ref}
        >
            <div className="relative w-full">
                {!metaImage && <div className="">No image</div>}
                {metaImage && typeof metaImage !== 'string' && <Media priority imgClassName='aspect-video rounded-lg shadow' resource={metaImage} size="33vw" />}
            </div>

            <div className="px-2 pt-4 pb-4 h-fit">
                {showCategories && hasCategories && (
                    <div className="uppercase text-xs mb-2">
                        {showCategories && hasCategories && (
                            <div>
                                {categories?.map((category, index) => {
                                    if (typeof category === 'object') {
                                        const { title: titleFromCategory } = category
                                        const categoryTitle = titleFromCategory || 'Untitled category'
                                        const isLast = index === categories.length - 1
                                        return (
                                            <Fragment key={index}>
                                                {categoryTitle}
                                                {!isLast && <Fragment>, &nbsp;</Fragment>}
                                            </Fragment>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        )}
                    </div>
                )}
                {titleToUse && (
                    <div className="flex">
                        <h3>
                            <Link className="not-prose font-bold" href={href} ref={link.ref}>
                                {titleToUse}
                            </Link>
                        </h3>
                    </div>
                )}
                {description && <div className="text-xs md:text-sm font-light line-clamp-2 md:line-clamp-3 text-secondary-foreground/85">{description && <p>{sanitizedDescription}</p>}</div>}
                <div className='flex flex-col md:flex-row items-center justify-between mt-3'>
                    <Link href={href}><Badge variant={'secondary'} >MORE DETAILS..</Badge></Link>
                    <Link href={`https://wa.me/256778181840?text=${encodeURIComponent(`Product Name: ${titleToUse!} <br/> Product Description: ${description}`)}`}><Badge className='bg-green-500 text-secondary-foreground'>PURCHASE</Badge></Link>
                </div>
            </div>
        </article>
    )
}