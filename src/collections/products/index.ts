import { slugField } from "@/fields/slug";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";
import { revalidateDelete, revalidateProducts } from "./hooks/revalidateProducts";
import { Banner } from "@/add-ons/Banner/config";
import { Code } from "@/add-ons/Code/config";
import { MediaBlock } from "@/add-ons/MediaBlock/config";
import { ImageGalleryBlock } from "@/add-ons/ImageGallery/config";

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        group: 'Management',
        useAsTitle: 'title'
    },
    access: {
        read: () => true
    },
    folders: {
        browseByFolder: true,

    },
    forceSelect: {
        title: true
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
                            hasMany: false,
                            admin: {
                                description: 'The Product Image is a poster image meant to represnet how the product looks like in a small screen preview'
                            }
                        },
                        {
                            name: 'quotation',
                            type: 'array',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'price',
                                            type: 'text',
                                        },
                                        {
                                            name: 'currency',
                                            type: 'select',
                                            options: [
                                                {
                                                    label: "UGANDAN SHILLINGS",
                                                    value: "UGX"
                                                },
                                                {
                                                    label: "UNITED STATES DOLLAR",
                                                    value: "USD"
                                                },
                                                {
                                                    label: "KENYAN SHILLINGS",
                                                    value: "KES"
                                                },
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            name: 'productDetails',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        BlocksFeature({ blocks: [Banner, Code, MediaBlock, ImageGalleryBlock] }),
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
                            relationTo: "products",
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
                            overrides: {
                                admin: {
                                    description: 'The Open Graph (OG) image and Twitter Card image provide a visual representation of your page or post when shared on social media platforms and in search results (though less directly for Google`s main SERP, it`s crucial for discovery on social channels). These images act as a `cover` for your content, helping to attract clicks and convey the essence of the page before a user even visits.'
                                }
                            }
                        }),
                        {
                            name: 'keywords',
                            type: "relationship",
                            relationTo: 'keywords',
                            hasMany: true,
                            admin: {
                                description: 'Keywords are the specific words and phrases users type into search engines. Optimizing your content with relevant keywords helps search engines understand what your content is about, enabling it to appear in relevant search results when users are looking for information, products, or services that match your offerings.'
                            }
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
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidateProducts],
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