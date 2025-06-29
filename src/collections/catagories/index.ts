import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: 'categories',
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