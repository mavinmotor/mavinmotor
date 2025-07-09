'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

type RouteType = 'search' | 'products' | 'posts';
interface SearchProps {
    routeType: RouteType; // Add routeType as a prop
    className?: string;
}


export const Search: React.FC<SearchProps> = ({ routeType, className }) => {
    const [value, setValue] = useState('')
    const router = useRouter()

    const debouncedValue = useDebounce(value)

    useEffect(() => {
        // Ensure routeType is valid before pushing
        if (['search', 'products', 'posts'].includes(routeType)) {
            router.push(`/${routeType}${debouncedValue ? `?q=${debouncedValue}` : ''}`);
        } else {
            // Fallback or error handling for invalid routeType (optional but recommended)
            console.warn(`Invalid routeType provided to Search component: ${routeType}. Defaulting to /search.`);
            router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`);
        }
    }, [debouncedValue, router])

    return (
        <div className={className}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                }}
                className='relative flex items-center shadow bg-input/35 rounded-md backdrop-blur-3xl'
            >
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>
                <SearchIcon className='absolute left-3' />
                <Input
                    id="search"
                    onChange={(event) => {
                        setValue(event.target.value)
                    }}
                    placeholder="Search"
                    className='border-0 ml-10 p-6 rounded-none bg-transparent dark:bg-transparent shadow-none'
                />
                <button type="submit" className="sr-only">
                    submit
                </button>
            </form>
        </div>
    )
}