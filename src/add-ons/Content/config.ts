import type { Block, Field } from 'payload'

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
    {
        name: 'size',
        type: 'select',
        defaultValue: 'oneThird',
        options: [
            {
                label: 'One Third',
                value: 'oneThird',
            },
            {
                label: 'Half',
                value: 'half',
            },
            {
                label: 'Two Thirds',
                value: 'twoThirds',
            },
            {
                label: 'Full',
                value: 'full',
            },
        ],
    },
    {
        name: 'richText',
        type: 'richText',
        editor: lexicalEditor({
            features: ({ rootFeatures }) => {
                return [
                    ...rootFeatures
                ]
            },
        }),
        label: false,
    },
    {
        type: 'row',
        fields: [
            {
                name: 'enableLink',
                type: 'checkbox',
                admin: {
                    width: '50%'
                }
            },
            {
                name: 'isCarded',
                type: 'checkbox',
                admin: {
                    width: '50%'
                }
            },
        ]
    },
    link({
        overrides: {
            admin: {
                condition: (_data, siblingData) => {
                    return Boolean(siblingData?.enableLink)
                },
            },
        },
    }),
]

export const Content: Block = {
    slug: 'content',
    interfaceName: 'ContentBlock',
    fields: [
        {
            name: 'columns',
            type: 'array',
            admin: {
                initCollapsed: true,
            },
            fields: columnFields,
        },
    ],
}