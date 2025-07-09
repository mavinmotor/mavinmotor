import type { Product, MerchantBlock as MerchantBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const MerchantBlock: React.FC<
    MerchantBlockProps & {
        id?: string
    }
> = async (props) => {
    const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

    const limit = limitFromProps || 3

    let products: Product[] = []

    if (populateBy === 'collection') {
        const payload = await getPayload({ config: configPromise })

        const flattenedCategories = categories?.map((category) => {
            if (typeof category === 'object') return category.id
            else return category
        })

        const fetchedProducts = await payload.find({
            collection: "products",
            depth: 1,
            limit,
            ...(flattenedCategories && flattenedCategories.length > 0
                ? {
                    where: {
                        categories: {
                            in: flattenedCategories,
                        },
                    },
                }
                : {}),
        })

        products = fetchedProducts.docs
    } else {
        if (selectedDocs?.length) {
            const filteredSelectedPosts = selectedDocs.map((post) => {
                if (typeof post.value === 'object') return post.value
            }) as Product[]

            products = filteredSelectedPosts
        }
    }

    return (
        <div className="my-16" id={`block-${id}`}>
            {introContent && (
                <div className="container flex items-center justify-center mb-16 w-full">
                    <div className='flex items-center justify-center'>
                        <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
                    </div>
                </div>
            )}
            <CollectionArchive products={products} />
        </div>
    )
}