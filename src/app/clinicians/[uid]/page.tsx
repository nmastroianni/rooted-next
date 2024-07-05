import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import Heading from '@/components/typography/Heading'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { asText, isFilled } from '@prismicio/client'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ServiceDocument } from '../../../../prismicio-types'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getUrlSegments } from '@/lib/utils'
import PageBreadcrumbs from '@/components/layout/PageBreadcrumbs'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('clinician', params.uid, { fetchLinks: ['service.title'] })
    .catch(() => notFound())
  const urlSegments = getUrlSegments(page.url)
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
        <PageBreadcrumbs segments={urlSegments} title={page.data.full_name} />
        <div className="flex justify-center">
          <div className="relative">
            <PrismicNextImage
              field={page.data.portrait}
              imgixParams={{ ar: '1:1', fit: 'crop' }}
              width={300}
              className="z-10 -mb-12 rounded-full shadow-md"
            />
            {isFilled.select(page.data.status) &&
            page.data.status !== 'Not Accepting New Clients' ? (
              <Link href="/contact">
                <Badge className="absolute -right-24 top-0 p-2">
                  {page.data.status}
                </Badge>
              </Link>
            ) : (
              <Badge className="absolute -right-24 top-0 cursor-default p-2">
                {page.data.status}
              </Badge>
            )}
          </div>
        </div>
        <Section as="div" width="xl">
          <div className="mx-auto max-w-screen-lg rounded-lg bg-background p-4 pt-8">
            <div className="prose mx-auto mt-6 grid items-center gap-4 lg:prose-lg xl:prose-xl prose-ul:pl-0 lg:mt-8 lg:grid-cols-5 lg:gap-8">
              <Heading as="h2" size="3xl" className="lg:col-span-2 lg:mb-0">
                {page.data.first_name} focuses on:
              </Heading>
              {isFilled.group(page.data.focuses) && (
                <ul className="flex list-none flex-wrap gap-4 lg:col-span-3">
                  {page.data.focuses.map((focus, i) => {
                    return (
                      <li
                        key={focus.focus ? focus.focus : 'clinicianfocus' + i}
                      >
                        <Badge variant={'default'}>{focus.focus}</Badge>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div className="prose mx-auto mt-6 grid items-center justify-center gap-4 pb-4 lg:prose-lg xl:prose-xl prose-ul:pl-0 lg:mt-8 lg:grid-cols-5 lg:gap-8 lg:pb-8">
              <Heading
                as="h2"
                size="3xl"
                className="flex-1 lg:col-span-2 lg:mb-0"
              >
                Approaches:
              </Heading>
              {isFilled.group(page.data.approaches) && (
                <ul className="flex flex-grow list-none flex-wrap gap-4 lg:col-span-3">
                  {page.data.approaches.map((approach, i) => {
                    return (
                      <li
                        key={
                          approach.approach
                            ? approach.approach
                            : 'clinicianfocus' + i
                        }
                      >
                        <Badge variant={'default'}>{approach.approach}</Badge>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div className="mb-4 flex justify-center lg:mb-12">
              <PrismicNextLink
                field={page.data.psychtoday}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'bg-[#477be4] text-background',
                )}
              >
                View on Psychology Today
              </PrismicNextLink>
            </div>
            <hr />
            <div className="prose mx-auto my-3 lg:prose-lg xl:prose-xl lg:my-6">
              <Heading as="h2" size="4xl">
                About {page.data.first_name}
              </Heading>
            </div>
            <PrismicRichText field={page.data.about} />
            <div className="prose mx-auto my-3 lg:prose-lg xl:prose-xl lg:my-6">
              <Heading as="h3" size="3xl">
                {page.data.first_name} specializes in treating:
              </Heading>
            </div>
            <PrismicRichText field={page.data.specialties} />
            {isFilled.group(page.data.services) && (
              <div className="prose mx-auto lg:prose-lg xl:prose-xl prose-a:no-underline prose-ul:pl-0">
                <div className="prose mx-auto my-3 lg:prose-lg xl:prose-xl lg:my-6">
                  <Heading as="h3" size="3xl">
                    Services {page.data.first_name} renders:
                  </Heading>
                </div>
                <ul className="flex list-none flex-col gap-4 lg:flex-row">
                  {page.data.services.map((item, i) => {
                    const service = item.service as unknown as ServiceDocument
                    return (
                      <li key={i}>
                        <Link
                          href={service.url || '#'}
                          className={buttonVariants({ variant: 'default' })}
                        >
                          {asText(service.data.title)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
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
  const settings = await client.getSingle('settings')

  return {
    title: `${asText(page.data.full_name)} • ${settings.data.site_title}`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
      title: page.data.meta_title || asText(page.data.full_name),
    },
    alternates: {
      canonical: `https://${settings.data.domain || `example.com`}${page.url}`,
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('clinician')
  return pages.map(page => {
    return { uid: page.uid }
  })
}
