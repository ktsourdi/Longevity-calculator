import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'when r u gonna die | death age calculator',
  description: 'find out when ur gonna die fr (its real science trust)',
}

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
