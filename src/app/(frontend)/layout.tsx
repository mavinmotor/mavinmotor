import React from 'react'
import { cn } from '@/utilities/utils'
import Header from '@/components/header'
import { GeistSans as sans } from "geist/font/sans";
import { GeistMono as mono } from "geist/font/mono";
import { ThemeProvider } from '@/components/theme-provider'

import '@/app/(frontend)/globals.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang={"en"} suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        sans.variable, mono.variable
      )}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableSystem
        // disableTransitionOnChange
        >
          <main className={cn('relative flex min-h-screen flex-col')}>
            <Header />
            <div className='flex-1'>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
