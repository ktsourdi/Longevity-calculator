import type { Metadata, Viewport } from 'next'
import './globals.css'

/**
 * Metadata configuration for the application
 * Defines SEO-related information for the site
 */
export const metadata: Metadata = {
  title: 'when r u gonna die | death age calculator',
  description: 'find out when ur gonna die fr (its real science trust)',
  keywords: ['longevity calculator', 'death age predictor', 'life expectancy', 'health calculator'],
  authors: [{ name: 'ktsourdi' }],
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
