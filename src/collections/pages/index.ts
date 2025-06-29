import { slugField } from "@/fields/slug";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { CollectionConfig } from "payload";

import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CallToAction } from "@/add-ons/CallToAction/config";
import { Content } from "@/add-ons/Content/config";
import { MediaBlock } from "@/add-ons/MediaBlock/config";
import { Archive } from "@/add-ons/ArchiveBlock/config";
import { FormBlock } from "@/add-ons/Form/config";
import { hero } from "@/heros/config";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) => {
                const path = generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'pages',
                    req,
                })

                return path
            },
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'pages',
                req,
            }),
        useAsTitle: 'title',
        group: 'Management'
    },
    access: {
        read: () => true
    },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [hero],
                    label: 'Hero',
                },
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
                            required: true,
                            admin: {
                                initCollapsed: true,
                            },
                        },
                    ],
                    label: 'Content',
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
                        }),
                        {
                            name: 'keywords',
                            type: "relationship",
                            relationTo: "keywords",
                            hasMany: true
                        },
                        MetaDescriptionField({}),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                    ],
                },
            ]
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidatePage],
        beforeChange: [populatePublishedAt],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100, // We set this interval for optimal live preview
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}