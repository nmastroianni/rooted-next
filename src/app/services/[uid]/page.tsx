import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('service', params.uid)
    .catch(() => notFound())

  return (
    <>
      <Section width="xl">
        <PrismicRichText
          field={page.data.title}
          components={{
            heading1: ({ children }) => (
              <Heading as="h1" size="5xl" className="lg:text-center">
                {children}
              </Heading>
            ),
          }}
        />
        <PrismicRichText field={page.data.description} />
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

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('service')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
