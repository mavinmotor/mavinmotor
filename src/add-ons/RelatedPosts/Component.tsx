import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Product } from '@/payload-types'

import { Card } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedPostsProps = {
    className?: string
    docs?: Product[]
    introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
    const { className, docs, introContent } = props

    return (
        <div className={clsx('lg:container', className)}>
            {introContent && <RichText data={introContent} enableGutter={false} />}

            <div className='md:max-w-5xl mx-auto'>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-stretch">
                    {docs?.map((doc, index) => {
                        if (typeof doc === 'string') return null
                        return <Card key={index} doc={doc} relationTo={"products"} showCategories />
                    })}
                </div>
            </div>

        </div>
    )
}