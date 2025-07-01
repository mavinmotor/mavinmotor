import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Footer: GlobalConfig = {
    slug: 'footer',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Preferences'
    },
    fields: [
        {
            name: 'intro',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures
                    ]
                },
            }),
        },
        {
            name: 'navItems',
            type: 'array',
            fields: [
                link({
                    appearances: false,
                }),
            ],
            maxRows: 6,
            admin: {
                initCollapsed: true,
                components: {
                    RowLabel: '@/preferences/footer/RowLabel#RowLabel',
                },
            },
        },
        {
            name: 'copyright',
            type: 'text',
            admin: {
                description: 'The copyright of the website presented at the bottom of the footer eg: Copyright © 2025 company name or bussiness name',
                position: 'sidebar'
            }
        }
    ],
    hooks: {
        afterChange: [revalidateFooter],
    },
}