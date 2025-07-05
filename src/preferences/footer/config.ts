import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

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
            name: 'columns',
            type: 'array',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'navItems',
                    type: 'array',
                    fields: [
                        link({
                            appearances: false,
                        }),
                    ],
                },
            ],
            maxRows: 3,
            minRows: 1,
        },
        {
            name: 'copyRight',
            type: 'text',
            admin: {
                position: 'sidebar'
            }
        }
    ],
    hooks: {
        afterChange: [revalidateFooter],
    },
}