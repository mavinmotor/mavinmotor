import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { PageRange } from '@/components/PageRange'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
    const payload = await getPayload({ config: configPromise })

    const products = await payload.find({
        collection: "products",
        depth: 1,
        limit: 12,
        overrideAccess: false,
        select: {
            title: true,
            slug: true,
            categories: true,
            meta: true,
        },
    })

    return (
        <div className="pt-24 pb-24">
            <PageClient />
            <div className="container mb-16">
                <div className="prose dark:prose-invert max-w-none">
                    <h1 className='text-3xl font-bold'>PRODUCTS PLACE</h1>
                </div>
            </div>

            <CollectionArchive products={products.docs} />

            <div className="container">
                {products.totalPages > 1 && products.page && (
                    <Pagination page={products.page} totalPages={products.totalPages} />
                )}
            </div>

            <div className="container mb-8">
                <PageRange
                    collection={'products'}
                    currentPage={products.page}
                    limit={12}
                    totalDocs={products.totalDocs}
                />
            </div>
        </div>
    )
}

export function generateMetadata(): Metadata {
    return {
        title: `Mavin Motor Products - A catalogue of all our products and services`,
    }
}