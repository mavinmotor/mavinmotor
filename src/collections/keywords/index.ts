import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Keywords: CollectionConfig = {
    slug: 'keywords',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'title',
        group: 'Tags'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        ...slugField(),
    ],
}