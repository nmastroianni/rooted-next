import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import Heading from '@/components/typography/Heading'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('clinician', params.uid)
    .catch(() => notFound())
  return (
    <>
      <Section width="xl" className="bg-secondary">
        <PrismicRichText
          field={page.data.full_name}
          components={{
            heading1: ({ children }) => (
              <Heading as="h1" size="5xl" className="mb-8 lg:text-center">
                {children}
              </Heading>
            ),
          }}
        />
        <div className="flex justify-center">
          <PrismicNextImage
            field={page.data.portrait}
            imgixParams={{ ar: '1:1', fit: 'crop' }}
            width={300}
            className="z-10 -mb-12 rounded-full shadow-md"
          />
        </div>
        <Section as="div" width="xl">
          <div className="mx-auto max-w-screen-lg rounded-lg bg-background py-4 lg:py-8">
            <div className="mx-auto mt-6 flex max-w-screen-md items-center gap-4 lg:mt-8 lg:gap-8">
              <Heading as="h2" size="3xl">
                {page.data.first_name} Focuses on:
              </Heading>
              {isFilled.group(page.data.focuses) && (
                <ul className="flex flex-wrap gap-4 divide-x-2 lg:gap-8">
                  {page.data.focuses.map((focus, i) => {
                    return (
                      <li
                        key={focus.focus ? focus.focus : 'clinicianfocus' + i}
                        className="pl-8"
                      >
                        {focus.focus}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <PrismicRichText field={page.data.about} />
          </div>
        </Section>
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
    .getByUID('clinician', params.uid)
    .catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('clinician')
  return pages.map(page => {
    return { uid: page.uid }
  })
}
