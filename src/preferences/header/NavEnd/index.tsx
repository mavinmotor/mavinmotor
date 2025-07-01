'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon, ShoppingBagIcon } from 'lucide-react'
import { cn } from '@/utilities/utils'
import { Button, buttonVariants } from '@/components/ui/button'

export const EndNav: React.FC = ({ }) => {
    return (
        <nav className={'ml-auto flex items-center gap-3 md:flex-1 md:justify-end'}>
            <div className='relative'>
                <Button size={'icon'} className={'rounded-full'}>
                    <ShoppingBagIcon strokeWidth={3} />
                </Button>
                <span className='absolute flex items-center justify-center z-10 top-[-2px] right-[-2px] shadow-2xl text-sm text-secondary font-bold bg-amber-400 rounded-full w-5 h-5'>2</span>
            </div>

            <Link href="/search" className={cn(
                buttonVariants({
                    size: 'icon',
                    variant: 'secondary'
                }),
                'rounded-full'
            )}>
                <span className="sr-only">Search</span>
                <SearchIcon className={''} strokeWidth={3} />
            </Link>
        </nav>
    )
}