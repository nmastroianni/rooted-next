import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { asText } from '@prismicio/client'
import PageBreadcrumbs from '@/components/layout/PageBreadcrumbs'
import { getUrlSegments } from '@/lib/utils'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('service', params.uid)
    .catch(() => notFound())
  const urlSegments = getUrlSegments(page.url)
  return (
    <>
      <Section width="xl">
        <PrismicRichText
          field={page.data.title}
          components={{
            heading1: ({ children }) => (
              <Heading as="h1" size="5xl" className="my-8 lg:text-center">
                {children}
              </Heading>
            ),
          }}
        />
        <PrismicRichText field={page.data.description} />
        <PageBreadcrumbs segments={urlSegments} title={page.data.title} />
        <hr />
      </Section>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client
    .getByUID('service', params.uid)
    .catch(() => notFound())

  const settings = await client.getSingle('settings')

  return {
    title: `${asText(page.data.title)} • ${settings.data.site_title}`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
      title: page.data.meta_title || asText(page.data.title),
    },
    alternates: {
      canonical: `https://${settings.data.domain || `example.com`}${page.url}`,
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('service')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
