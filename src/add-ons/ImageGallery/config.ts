import type { Block } from 'payload'

export const ImageGalleryBlock: Block = {
    slug: 'imageGallery',
    interfaceName: 'ImageGalleryBlock',
    fields: [
        {
            name: "gallery",
            type: 'array',
            fields: [
                {
                    name: 'grid',
                    type: "select",
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
                    ]
                },
                {
                    name: 'media',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ]
        }
    ],
}