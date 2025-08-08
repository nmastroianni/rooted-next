import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PrismicPreview } from '@prismicio/next'
import { createClient, repositoryName } from '@/prismicio'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import { cn } from '@/lib/utils'
import SkipNav from '@/components/layout/SkipNav'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL(`https://${settings.data.domain || `example.com`}`),
    title: settings.data.site_title || 'Rooted Psychotherapy & Counseling',
    description: settings.data.site_meta_description || `Rooted Psychotherapy.`,
    openGraph: {
      images: [settings.data.site_meta_image.url || ''],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background flex min-h-screen flex-col justify-between font-sans antialiased',
          inter.className,
        )}
      >
        <SkipNav />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
