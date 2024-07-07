import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { asText } from '@prismicio/client'
import {
  generateBreadcrumbs,
  getOrganization,
  getUrlSegments,
} from '@/lib/utils'
import PageBreadcrumbs from '@/components/layout/PageBreadcrumbs'
import Heading from '@/components/typography/Heading'
import { Graph, ListItem } from 'schema-dts'

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
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
  const pageNumber = { page: searchParams.page }
  const urlSegments = getUrlSegments(page.url)
  const settings = await client.getSingle('settings')
  const jsonBreadcrumbs = urlSegments.map((item, i) => {
    const crumb: ListItem = {
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@id': `https://${settings.data.domain || `example.com`}${page.url}`,
        name: item,
      },
    }
    return crumb
  })
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://${settings.data.domain || `example.com`}/#page`,
        url: `https://${settings.data.domain || `example.com`}${page.url}#main-content`,
        description: page.data.meta_description || undefined,
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date,
        inLanguage: page.lang || 'en-US',
        breadcrumb: {
          '@id': `https://${settings.data.domain || `example.com`}${page.url}#breadcrumbs`,
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': `https://${settings.data.domain || `example.com`}/#website`,
          url: `https://${settings.data.domain || `example.com`}/`,
          name: settings.data.site_title || undefined,
          publisher: await getOrganization(),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://${settings.data.domain || `example.com`}${page.url}#breadcrumbs`,
        itemListElement: generateBreadcrumbs(
          settings.data.domain,
          page,
          urlSegments,
        ),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Heading
        as="h1"
        size="6xl"
        className="mx-auto mt-8 max-w-screen-lg px-2 md:px-6 lg:mt-12 lg:text-center"
      >
        {asText(page.data.title)}
      </Heading>
      <PageBreadcrumbs segments={urlSegments} title={page.data.title} />
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
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
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
    },
    alternates: {
      canonical: `https://${settings.data.domain || `example.com`}${page.url}`,
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('page')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
