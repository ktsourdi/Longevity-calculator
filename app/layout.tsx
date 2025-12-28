import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Death Age Predictor | Find Out When You\'ll Die',
  description: 'Calculate your death age with our totally scientific and definitely not made up algorithm',
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
