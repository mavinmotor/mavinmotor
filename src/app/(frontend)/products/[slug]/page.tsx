import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedPosts } from '@/add-ons/RelatedPosts/Component'
import { ProductHero } from '@/heros/ProductHero'

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const products = await payload.find({
        collection: "products",
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = products.docs.map(({ slug }) => {
        return { slug }
    })

    return params
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function Post({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    const url = '/posts/' + slug
    const products = await queryPostBySlug({ slug })

    if (!products) return <PayloadRedirects url={url} />

    return (
        <article className="pt-16 pb-16">
            <PageClient />

            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />

            {draft && <LivePreviewListener />}

            <ProductHero product={products} />

            <div className="flex flex-col items-center gap-4 pt-8">
                <div className="container">
                    <RichText className="max-w-[48rem] mx-auto" data={products.productDetails} enableGutter={false} />
                    {products.relatedPosts && products.relatedPosts.length > 0 && (
                        <RelatedPosts
                            className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                            docs={products.relatedPosts.filter((product) => typeof product === 'object')}
                        />
                    )}
                </div>
            </div>
        </article>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    const products = await queryPostBySlug({ slug })

    return generateMeta({ doc: products })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: "products",
        draft,
        limit: 1,
        overrideAccess: draft,
        pagination: false,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})