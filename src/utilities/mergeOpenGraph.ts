import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
    type: 'website',
    description: 'Mavin Motor is a certified manufacturer of high-performance industrial machinery—trusted across East Africa for over 15 years.',
    images: [
        {
            url: `${getServerSideURL()}/track.webp`,
        },
    ],
    siteName: 'Mavin Motor',
    title: 'Mavin Motor - Engineering Africa`s Machines',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
    return {
        ...defaultOpenGraph,
        ...og,
        images: og?.images ? og.images : defaultOpenGraph.images,
    }
}