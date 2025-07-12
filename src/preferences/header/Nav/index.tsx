'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/utils'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { AlignRight, Search } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
    const [open, setOpen] = useState(false)
    const navItems = data?.navItems || []

    return (
        <nav className={'flex items-center gap-3'}>
            {navItems.map(({ link }, i) => {
                return <CMSLink
                    key={i} {...link}
                    appearance={"inline"}
                    className={cn('hidden lg:flex text-secondary-foreground/55 hover:text-secondary-foreground/85')}
                />
            })}
            <Link href="/search" className={cn(
                buttonVariants({
                    variant: 'secondary',
                    size: 'sm'
                }),
                'hidden md:flex items-center'
            )}>
                Search Products...  <Search />
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className='cursor-pointer flex lg:hidden text-secondary-foreground/85'><AlignRight strokeWidth={2} /></SheetTrigger>
                <SheetContent side={'left'} className='flex flex-col justify-between bg-background/15 backdrop-blur-3xl border-0 py-0 my-0'>
                    <SheetHeader className='hidden'>
                        <SheetTitle></SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className='flex flex-col text-start justify-start w-full gap-3 px-5 py-10'>
                        {navItems.map(({ link }, i) => {
                            return (
                                <Button key={i} variant={'ghost'} onClick={() => setOpen(!open)} className='w-fit flex items-center justify-items-start px-0'>
                                    <CMSLink
                                        {...link}
                                        appearance={"inline"}
                                        className={cn('text-2xl z-0 text-secondary-foreground/55 hover:text-secondary-foreground/85 overflow-hidden')}
                                    />
                                </Button>
                            )
                        })}

                        <Link href="/search" className={cn(
                            buttonVariants({
                                variant: 'secondary',
                                size: 'lg'
                            }),
                            'flex items-center justify-between text-start mt-10'
                        )}>
                            Search Products...  <Search />
                        </Link>
                    </div>

                    <a className='text-sm font-light px-5 py-10'>Mavin Motor</a>
                </SheetContent>
            </Sheet>
        </nav>
    )
}