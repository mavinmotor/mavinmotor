'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'

import type { Theme } from './types'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
    const { setTheme } = useTheme()
    const [value, setValue] = useState('')

    const onThemeChange = (themeToSet: Theme & 'auto') => {
        if (themeToSet === 'auto') {
            setTheme(null)
            setValue('auto')
        } else {
            setTheme(themeToSet)
            setValue(themeToSet)
        }
    }

    React.useEffect(() => {
        const preference = window.localStorage.getItem(themeLocalStorageKey)
        setValue(preference ?? 'auto')
    }, [])

    return (
        <Select onValueChange={onThemeChange} value={value}>
            <SelectTrigger
                aria-label="Select a theme"
                className="w-full bg-transparent gap-2 pl-0 md:pl-3 border-none rounded-none"
            >
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className='rounded'>
                <SelectItem value="auto" className='rounded'>Auto</SelectItem>
                <SelectItem value="light" className='rounded'>Light</SelectItem>
                <SelectItem value="dark" className='rounded'>Dark</SelectItem>
            </SelectContent>
        </Select>
    )
}