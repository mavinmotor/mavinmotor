import { slugField } from "@/fields/slug";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        group: 'Management'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            admin: {
                description: 'The title is basically the title of the page. (* Its a Required Field)'
            }
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Product',
                    fields: [
                        {
                            name: 'productImage',
                            type: 'upload',
                            relationTo: 'media',
                            hasMany: false
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'price',
                                    type: 'number'
                                },
                                {
                                    name: 'currency',
                                    type: 'text',
                                }
                            ]
                        },
                        {
                            name: 'productDetails',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                    ]
                                },
                            }),
                            label: false,
                            required: true,
                        }
                    ]
                },
                {
                    fields: [
                        {
                            name: 'relatedPosts',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            filterOptions: ({ id }) => {
                                return {
                                    id: {
                                        not_in: [id],
                                    },
                                }
                            },
                            hasMany: true,
                            relationTo: 'posts',
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: "categories",
                        },
                    ],
                    label: 'Meta',
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
                            relationTo: 'keywords',
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
            name: 'instock',
            type: 'number',
            required: true,
            defaultValue: 0,
            admin: {
                position: 'sidebar'
            }
        },
        ...slugField(),
    ],
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