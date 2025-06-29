import React from 'react'

import { HeaderThemeProvider } from './headertheme'
import { ThemeProvider } from './theme'

export const Providers: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <ThemeProvider>
            <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </ThemeProvider>
    )
}