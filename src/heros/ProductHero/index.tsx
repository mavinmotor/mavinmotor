import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export const ProductHero: React.FC<{
    product: Product
}> = ({ product }) => {
    const { categories, productImage, instock, updatedAt, title } = product

    return (
        <div className="relative -mt-[10.4rem] flex items-end">
            <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
                <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
                    <div className="uppercase text-sm mb-6">
                        {categories?.map((category, index) => {
                            if (typeof category === 'object' && category !== null) {
                                const { title: categoryTitle } = category

                                const titleToUse = categoryTitle || 'Untitled category'

                                const isLast = index === categories.length - 1

                                return (
                                    <React.Fragment key={index}>
                                        {titleToUse}
                                        {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                                    </React.Fragment>
                                )
                            }
                            return null
                        })}
                    </div>

                    <div className="">
                        <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                        {updatedAt && (
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">Date Published</p>

                                <time dateTime={updatedAt}>{formatDateTime(updatedAt)}</time>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="min-h-[80vh] select-none">
                {productImage && typeof productImage !== 'string' && (
                    <Media fill priority imgClassName="-z-10" resource={productImage} />
                )}
                <div className="absolute pointer-events-none left-0 bottom-0 w-full h-5/6 bg-gradient-to-t from-background to-transparent" />
            </div>
        </div>
    )
}