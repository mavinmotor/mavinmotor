import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { PageRange } from '@/components/PageRange'
import { Search } from '@/search/Component'
import Link from 'next/link'
import { cn } from '@/utilities/utils'
import { buttonVariants } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

export const revalidate = 600

type Args = {
    params: Promise<{
        pageNumber: string
    }>
}

export default async function Page({ params: paramsPromise }: Args) {
    const { pageNumber } = await paramsPromise
    const payload = await getPayload({ config: configPromise })

    const sanitizedPageNumber = Number(pageNumber)

    if (!Number.isInteger(sanitizedPageNumber)) notFound()

    const products = await payload.find({
        collection: 'products',
        depth: 1,
        limit: 12,
        page: sanitizedPageNumber,
        overrideAccess: false,
    })

    return (
        <div className="pt-24 pb-24">
            <PageClient />
            <div className="container mb-10 md:mb-16">
                <div className="flex flex-col gap-3 md:flex-row items-start md:items-center md:justify-between prose dark:prose-invert max-w-none">
                    <h1 className='text-3xl font-bold'>PRODUCTS PLACE</h1>
                    <Link href="/search" className={cn(
                        buttonVariants({
                            variant: 'secondary',
                            size: 'lg'
                        }),
                        'flex items-center'
                    )}>
                        Search Products...  <SearchIcon />
                    </Link>
                </div>
            </div>

            <CollectionArchive products={products.docs} />

            <div className="container">
                {products?.page && products?.totalPages > 1 && (
                    <Pagination slug={'products'} page={products.page} totalPages={products.totalPages} />
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { pageNumber } = await paramsPromise
    return {
        title: `Product Page ${pageNumber || ''}`,
    }
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const { totalDocs } = await payload.count({
        collection: 'products',
        overrideAccess: false,
    })

    const totalPages = Math.ceil(totalDocs / 10)

    const pages: { pageNumber: string }[] = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push({ pageNumber: String(i) })
    }

    return pages
}