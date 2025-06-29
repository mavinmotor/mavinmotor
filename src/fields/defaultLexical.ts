import type { TextFieldSingleValidation } from 'payload'
import {
    BoldFeature,
    ItalicFeature,
    LinkFeature,
    ParagraphFeature,
    lexicalEditor,
    UnderlineFeature,
    type LinkFields,
    FixedToolbarFeature,
    InlineToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    BlockquoteFeature,
    AlignFeature,
    ChecklistFeature,
    EXPERIMENTAL_TableFeature,
    IndentFeature,
    InlineCodeFeature,
    OrderedListFeature,
    StrikethroughFeature,
    SubscriptFeature,
    SuperscriptFeature,
    UnorderedListFeature,
    UploadFeature,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
    features: [
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        ParagraphFeature(),
        UnderlineFeature(),
        HorizontalRuleFeature(),
        BlockquoteFeature(),
        BoldFeature(),
        ItalicFeature(),
        AlignFeature(),
        UploadFeature(),
        IndentFeature(),
        ChecklistFeature(),
        InlineCodeFeature(),
        SubscriptFeature(),
        SuperscriptFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        StrikethroughFeature(),
        EXPERIMENTAL_TableFeature(),
        LinkFeature({
            enabledCollections: ['pages', 'posts', 'products'],
            fields: ({ defaultFields }) => {
                const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                    if ('name' in field && field.name === 'url') return false
                    return true
                })

                return [
                    ...defaultFieldsWithoutUrl,
                    {
                        name: 'url',
                        type: 'text',
                        admin: {
                            condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
                        },
                        label: ({ t }) => t('fields:enterURL'),
                        required: true,
                        validate: ((value, options) => {
                            if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                                return true // no validation needed, as no url should exist for internal links
                            }
                            return value ? true : 'URL is required'
                        }) as TextFieldSingleValidation,
                    },
                ]
            },
        }),
    ],
})