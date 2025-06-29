'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon, LucideShoppingBag, ScanFace } from "lucide-react"
import { usePathname } from "next/navigation";
import { cn } from "@/utilities/utils";

export default function Component() {
    const pathName = usePathname()

    const pathNameUrl = (url: string) => {
        return pathName == url || pathName.match(url)
    }

    return (
        <div className={"container 3xl:fixed:px-0 px-6"}>
            <div className={'3xl:fixed:container flex h-16 items-center gap-2 **:data-[slot=separator]:!h-4'}>
                <div className={'flex gap-5 items-center'}>
                    <div className="flex gap-3 font-bold items-center">
                        <ScanFace /> ODUYAH FABRICATORS
                    </div>
                    <nav className={'items-center gap-3 hidden lg:flex'}>
                        <Link href={'/'} className={cn('hover:text-primary/85',
                            pathNameUrl('/') && 'text-primary/65'
                        )}>Home</Link>
                        <Link href={'/products'} className={cn('hover:text-primary/85',
                            pathNameUrl('/products') && 'text-primary/65'
                        )}>Products</Link>
                        <Link href={'/contacts'} className={cn('hover:text-primary/85',
                            pathNameUrl('/contacts') && 'text-primary/65'
                        )}>Contacts</Link>
                        <Link href={'/wishlist'} className={cn('hover:text-primary/85',
                            pathNameUrl('/wishlist') && 'text-primary/65'
                        )}>Wishlist</Link>
                    </nav>
                </div>

                <div className={'ml-auto flex items-center gap-2 md:flex-1 md:justify-end'}>
                    <Button size={'icon'} className={'rounded-full'}>
                        <LucideShoppingBag className={"size-5"} strokeWidth={3} />
                    </Button>
                    <Button size={'icon'} className={'rounded-full'}>
                        <GithubIcon className={"size-5"} strokeWidth={3} />
                    </Button>
                </div>
            </div>
        </div>
    )
}