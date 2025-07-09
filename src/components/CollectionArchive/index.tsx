import React from 'react'

import { Card, CardPostData, CardProductData } from '@/components/Card'
import { cn } from '@/utilities/utils'

export type Props = {
    posts?: CardPostData[]
    products?: CardProductData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
    const { posts, products } = props

    const reusableClassName = "col-span-1"

    return (
        <div className={cn('container')}>
            <div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-3">
                    {posts && posts?.map((result, index) => {
                        if (typeof result === 'object' && result !== null) {
                            return (
                                <div className={reusableClassName} key={index}>
                                    <Card className="h-full" doc={result} relationTo="posts" showCategories />
                                </div>
                            )
                        }

                        return null
                    })}

                    {products && products?.map((result, index) => {
                        if (typeof result === 'object' && result !== null) {
                            return (
                                <div className={reusableClassName} key={index}>
                                    <Card className="h-full" doc={result} relationTo={'products'} showCategories />
                                </div>
                            )
                        }

                        return null
                    })}
                </div>
            </div>
        </div>
    )
}