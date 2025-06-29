import { slugField } from "@/fields/slug";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        group: 'Management'
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
                    label: 'Product',
                    fields: [
                        {
                            name: 'productImage',
                            type: 'upload',
                            relationTo: 'media',
                            hasMany: true
                        },
                        {
                            name: 'productName',
                            type: 'text',
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
                    label: 'SEO',
                    fields: []
                }
            ]
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