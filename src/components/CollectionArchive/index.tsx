import React from 'react'

import { Card, CardProductData } from '@/components/Card'
import { cn } from '@/utilities/utils'

export type Props = {
    products?: CardProductData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
    const { products } = props

    const reusableClassName = "col-span-1"
    return (
        <div className={cn('container')}>
            <div>
                {products && (() => {
                    const grouped: Record<string, typeof products> = {}

                    for (const product of products) {
                        if (typeof product === 'object' && product !== null) {
                            const productCategories = product.categories || []

                            if (productCategories.length === 0) {
                                if (!grouped['Uncategorized']) grouped['Uncategorized'] = []
                                grouped['Uncategorized'].push(product)
                                continue
                            }

                            for (const cat of productCategories) {
                                let title = 'Uncategorized'

                                if (typeof cat === 'string') {
                                    title = 'Unknown Category'
                                } else if (typeof cat === 'object' && cat !== null) {
                                    title = cat.title || 'Untitled Category'
                                }

                                if (!grouped[title]) grouped[title] = []
                                grouped[title].push(product)
                            }
                        }
                    }

                    return (
                        <div className="flex flex-col gap-10">
                            {Object.entries(grouped).map(([category, items]) => (
                                <div key={category}>
                                    <h2 className="text-xl font-semibold mb-4">{category}</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                        {shuffleArray(items).map((product, idx) => (
                                            <div className={reusableClassName} key={idx}>
                                                <Card
                                                    className="h-full"
                                                    doc={product}
                                                    relationTo="products"
                                                    showCategories
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                })()}
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
