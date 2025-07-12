import type { Metadata } from 'next'

import type { Media, Page, Config, Keyword, Product } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
    const serverUrl = getServerSideURL()
    let url = serverUrl + '/website-template-OG.webp'
    if (image && typeof image === 'object' && 'url' in image) {
        const ogUrl = image.sizes?.og?.url
        url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
    }
    return url
}

export const generateMeta = async (args: {
    doc: Partial<Page> | Partial<Product> | null
}): Promise<Metadata> => {
    const { doc } = args

    const ogImage = getImageURL(doc?.meta?.image)

    const getKeywordsTitles = (doc: any): string[] => {
        const keywordsType: (string | Keyword)[] = doc?.meta?.keywords || []

        if (Array.isArray(keywordsType)) {
            return keywordsType
                .map((keywrd) => {
                    if (typeof keywrd === 'object' && keywrd !== null && 'title' in keywrd) {
                        return (keywrd as Keyword).title
                    }
                    return String(keywrd) // Handles cases where it might be a string directly
                })
                .filter((title) => title !== null && title !== undefined) // Filter out any undefined/null titles
        }
        return []
    }

    const keywords = getKeywordsTitles(doc)

    return {
        description: doc?.meta?.description,
        openGraph: mergeOpenGraph({
            description: doc?.meta?.description || '',
            images: ogImage
                ? [
                    {
                        url: ogImage,
                    },
                ]
                : undefined,
            title: doc?.meta?.title || 'Empty',
            url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
        }),
        title: doc?.meta?.title || 'Empty',
        keywords: keywords,
    }
}