import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { asText } from '@prismicio/client'
import Heading from '@/components/typography/Heading'
import { Graph } from 'schema-dts'
import { getOrganization } from '@/lib/utils'
import { PrismicNextImage } from '@prismicio/next'

type Params = { uid: string }
type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const client = createClient()
  const page = await client
    .getByUID('post', params.uid, {})
    .catch(() => notFound())
  const settings = await client.getSingle('settings')
  const pageNumber = { page: searchParams.page }

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `https://${settings.data.domain || `example.com`}/#site`,
        name: settings.data.site_title || '',
        url: `https://${settings.data.domain || `example.com`}/`,
      },
      {
        '@type': 'Article',
        '@id': `https://${settings.data.domain || `example.com`}${
          page.url
        }/#post`,
        headline: asText(page.data.title),
        description:
          page.data.excerpt || page.data.meta_description || undefined,
        mainEntityOfPage: `https://${settings.data.domain || `example.com`}${
          page.url
        }`,
        datePublished: page.first_publication_date || undefined,
        dateModified: page.last_publication_date || undefined,
        author: await getOrganization(),
        image: page.data.meta_image.url || undefined,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative flex min-h-[300px] justify-center">
        <PrismicNextImage
          field={page.data.featured_image}
          fill
          className={'-z-10 object-cover'}
        />
        <div className="my-12 max-w-2xl rounded-lg bg-background/80 px-12 py-36 backdrop-blur">
          <Heading
            as="h1"
            size="6xl"
            className="z-10 mx-auto my-8 max-w-screen-lg px-2 md:px-6 lg:my-12 lg:text-center"
          >
            {asText(page.data.title)}
          </Heading>
        </div>
      </div>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={pageNumber}
      />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')

  return {
    title: `${asText(page.data.title) || page.data.meta_title} • ${
      settings.data.site_title
    }`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
      siteName: settings.data.site_title || '',
    },
    alternates: {
      canonical: `https://${settings.data.domain || `example.com`}${page.url}`,
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('post')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
