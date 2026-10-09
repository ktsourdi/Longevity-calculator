import type { Metadata, Viewport } from 'next'
import './globals.css'

/**
 * Metadata configuration for the application
 * Defines SEO-related information for the site
 */
const SITE_URL = 'https://longevity-calculator-blush.vercel.app'
const TITLE = 'when r u gonna die | death age calculator'
const DESCRIPTION = 'find out when ur gonna die fr (its real science trust)'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['longevity calculator', 'death age predictor', 'life expectancy', 'health calculator'],
  authors: [{ name: 'ktsourdi' }],
  alternates: { canonical: '/' },
  // Share images come from app/opengraph-image.png and app/twitter-image.png;
  // icons from app/favicon.ico, app/icon.svg and app/apple-icon.png.
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'when r u gonna die',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

/**
 * Viewport configuration for the application
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

/**
 * Root layout component for the Next.js application
 * Wraps all pages with the HTML structure and global styles
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
