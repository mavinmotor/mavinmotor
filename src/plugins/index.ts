import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { s3Storage } from '@payloadcms/storage-s3'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import type { Page, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Page | Product> = ({ doc }) => {
    return doc?.title ? doc.title : 'Empty autogen meta title'
}

const generateURL: GenerateURL<Page | Product> = ({ doc }) => {
    const url = getServerSideURL()

    return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
    redirectsPlugin({
        collections: ['pages', 'products'],
        overrides: {
            admin: {
                group: 'Add ons'
            },
            // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
            fields: ({ defaultFields }) => {
                return defaultFields.map((field) => {
                    if ('name' in field && field.name === 'from') {
                        return {
                            ...field,
                            admin: {
                                description: 'You will need to rebuild the website when changing this field.',
                            },
                        }
                    }
                    return field
                })
            },
            hooks: {
                afterChange: [revalidateRedirects],
            },
        },
    }),
    nestedDocsPlugin({
        collections: ["categories", 'keywords'],
        generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seoPlugin({
        generateTitle,
        generateURL,
    }),
    formBuilderPlugin({
        formSubmissionOverrides: {
            admin: {
                group: 'Add ons'
            },
        },
        fields: {
            payment: false,
        },
        formOverrides: {
            admin: {
                group: 'Add ons'
            },
            fields: ({ defaultFields }) => {
                return defaultFields.map((field) => {
                    if ('name' in field && field.name === 'confirmationMessage') {
                        return {
                            ...field,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        FixedToolbarFeature(),
                                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                    ]
                                },
                            }),
                        }
                    }
                    return field
                })
            },
        },
    }),
    searchPlugin({
        collections: ['products'],
        beforeSync: beforeSyncWithSearch,
        searchOverrides: {
            admin: {
                group: 'Add ons'
            },
            fields: ({ defaultFields }) => {
                return [...defaultFields, ...searchFields]
            },
        },
    }),
    payloadCloudPlugin(),
    s3Storage({
        collections: {
            media: {
                prefix: '',
            },
        },
        bucket: process.env.S3_BUCKET!,
        config: {
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
            },
            endpoint: process.env.S3_HOST || '',
            region: process.env.S3_REGION || '',
        },
        disableLocalStorage: true,
        enabled: true,
        acl: 'private',
    }),
]