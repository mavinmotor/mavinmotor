import React from 'react'

import { Card, CardProductData } from '@/components/Card'
import { cn } from '@/utilities/utils'

export type Props = {
    products?: CardProductData[]
}

export const CollectionSearchArchive: React.FC<Props> = (props) => {
    const { products } = props

    const reusableClassName = "col-span-1"
    return (
        <div className={cn('container')}>
            <div>
                {products &&
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-3">
                        {products && products?.map((result, index) => {
                            if (typeof result === 'object' && result !== null) {
                                return (
                                    <div className={reusableClassName} key={index}>
                                        <Card className="h-full" doc={result} relationTo={"products"} showCategories />
                                    </div>
                                )
                            }

                            return null
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

// Helper: Fisher-Yates Shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}
