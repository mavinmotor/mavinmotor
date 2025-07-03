import React from 'react'
import { cn } from '@/utilities/utils'
import { GeistSans as sans } from "geist/font/sans";
import { GeistMono as mono } from "geist/font/mono";

import '@/app/(frontend)/globals.css'
import { InitTheme } from '@/components/theme-provider/theme/inittheme';
import { draftMode } from 'next/headers';
import { AdminBar } from '@/components/AdminBar';
import { Providers } from '@/components/theme-provider';
import { Header } from '@/preferences/header/Component';
import { Footer } from '@/preferences/footer/Component';
import { Metadata } from 'next';
import { getServerSideURL } from '@/utilities/getURL';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { isEnabled } = await draftMode()


  return (
    <html lang={"en"} suppressHydrationWarning>
      <head>
        <InitTheme />
        {/**other window detections for response */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>

      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        sans.variable, mono.variable
      )}
      >
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <div className='flex-1'>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}


export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@mavinmotor',
  },
}