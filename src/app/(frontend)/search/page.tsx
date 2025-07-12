import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CollectionSearchArchive } from '@/components/CollectionArchive/search'
import { CardProductData } from '@/components/Card'

type Args = {
    searchParams: Promise<{
        q: string
    }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
    const { q: query } = await searchParamsPromise
    const payload = await getPayload({ config: configPromise })

    const searchEngine = await payload.find({
        collection: 'search',
        depth: 1,
        limit: 12,
        select: {
            title: true,
            slug: true,
            categories: true,
            meta: true,
            relationTo: true
        },
        // pagination: false reduces overhead if you don't need totalDocs
        pagination: false,
        ...(query
            ? {
                where: {
                    or: [
                        {
                            title: {
                                like: query,
                            },
                        },
                        {
                            'meta.description': {
                                like: query,
                            },
                        },
                        {
                            'meta.title': {
                                like: query,
                            },
                        },
                        {
                            slug: {
                                like: query,
                            },
                        },
                    ],
                },
            }
            : {}),
    })

    return (
        <div className="pt-24 pb-24">
            <PageClient />
            <div className="container mb-16">
                <div className="prose dark:prose-invert max-w-none text-center">
                    <div className="max-w-[50rem] mx-auto">
                        <Search />
                    </div>
                </div>
            </div>

            {searchEngine.totalDocs > 0 ? (
                <CollectionSearchArchive
                    products={searchEngine.docs as CardProductData[]}
                />
            ) : (
                <div className="container">No results found.</div>
            )}
        </div>
    )
}

export function generateMetadata(): Metadata {
    return {
        title: `Mavin Motor search - Looking for a product Just use our search indexer to search throught our catalog of products`,
    }
}