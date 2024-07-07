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
import { cn, generateBreadcrumbs, getOrganization } from '@/lib/utils'
import { getUrlSegments } from '@/lib/utils'
import PageBreadcrumbs from '@/components/layout/PageBreadcrumbs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Graph, Offer, Thing } from 'schema-dts'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('clinician', params.uid, { fetchLinks: ['service.title'] })
    .catch(() => notFound())
  const settings = await client.getSingle('settings')
  const urlSegments = getUrlSegments(page.url)
  const { services } = page.data
  const jsonServices = services.map((item, i) => {
    const service = item.service as unknown as ServiceDocument
    const offer: Offer = {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: asText(service.data.title),
        url: `https://${settings.data.domain || `example.com`}${service.url}`,
      },
    }
    return offer
  })

  const { focuses } = page.data
  const jsonKnows = focuses.map(item => {
    const thing: Thing = {
      '@type': 'Thing',
      name: `${item.focus}`,
    }
    return thing
  })
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `https://${settings.data.domain || `example.com`}${page.url}#${page.id}`,
        url: `https://${settings.data.domain || `example.com`}${page.url}`,
        name: asText(page.data.full_name) || undefined,
        image: page.data.portrait.url || undefined,
        knowsAbout: jsonKnows || undefined,
        worksFor: await getOrganization(),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Psychotherapy services',
          itemListElement: jsonServices || undefined,
        },
      },
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
      <Section width="xl" className="bg-secondary">
        <PrismicRichText
          field={page.data.full_name}
          components={{
            heading1: ({ children }) => (
              <Heading as="h1" size="5xl" className="my-8 lg:text-center">
                {children}
              </Heading>
            ),
          }}
        />
        <PageBreadcrumbs segments={urlSegments} title={page.data.full_name} />
        <div className="mt-16 flex justify-center" id={page.id}>
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
                <Badge className="absolute -bottom-12 left-1/2 -translate-x-1/2 p-2">
                  {page.data.status}
                </Badge>
              </Link>
            ) : (
              <Badge className="absolute -bottom-12 left-1/2 -translate-x-1/2 cursor-default p-2">
                {page.data.status}
              </Badge>
            )}
          </div>
        </div>
        <Section as="div" width="xl">
          <div className="mx-auto max-w-screen-lg rounded-lg bg-background p-4 pt-8">
            <div className="prose mx-auto mt-6 grid place-content-center gap-4 lg:prose-lg xl:prose-xl prose-ul:pl-0 prose-li:my-0 lg:mt-8 lg:grid-cols-5 lg:gap-8">
              <Heading as="h2" size="3xl" className="mb-0 lg:col-span-2">
                {page.data.first_name} focuses on:
              </Heading>
              {isFilled.group(page.data.focuses) && (
                <ul className="flex list-none flex-wrap gap-2 lg:col-span-3 lg:gap-4">
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
            <div className="prose mx-auto mt-6 grid place-content-center justify-center gap-4 pb-4 lg:prose-lg xl:prose-xl prose-ul:pl-0 prose-li:my-0 lg:mt-8 lg:grid-cols-5 lg:gap-8 lg:pb-8">
              <Heading as="h2" size="3xl" className="mb-0 flex-1 lg:col-span-2">
                Approaches:
              </Heading>
              {isFilled.group(page.data.approaches) && (
                <ul className="flex flex-grow list-none flex-wrap gap-2 lg:col-span-3 lg:gap-4">
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
            <div className="prose mx-auto mt-6 grid place-content-center justify-center gap-4 pb-4 lg:prose-lg xl:prose-xl prose-ul:pl-0 prose-li:my-0 lg:mt-8 lg:grid-cols-5 lg:gap-8 lg:pb-8">
              <Heading as="h2" size="3xl" className="mb-0 flex-1 lg:col-span-2">
                Delivery:
              </Heading>
              {isFilled.select(page.data.service_delivery) && (
                <ul className="flex flex-grow list-none flex-wrap gap-2 lg:col-span-3 lg:gap-4">
                  <li>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant={'default'}>
                            {page.data.service_delivery}
                          </Badge>
                        </TooltipTrigger>
                        {page.data.service_delivery === 'Hybrid' && (
                          <TooltipContent>
                            {page.data.service_delivery === 'Hybrid'
                              ? `${page.data.first_name} offers in-person and telehealth services.`
                              : ''}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                </ul>
              )}
            </div>
            <div className="mb-12 mt-4 flex justify-center lg:mb-12">
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
                <ul className="flex list-none flex-col items-center gap-4 lg:flex-row">
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
