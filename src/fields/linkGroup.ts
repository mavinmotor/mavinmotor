import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from './link'

import { link } from './link'
import deepMerge from '@/utilities/deepMerge'

type LinkGroupType = (options?: {
    appearances?: LinkAppearances[] | false
    overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
    const generatedLinkGroup: Field = {
        name: 'links',
        type: 'array',
        fields: [
            link({
                appearances,
            }),
        ],
        admin: {
            initCollapsed: true,
        },
    }

    return deepMerge(generatedLinkGroup, overrides)
}