import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `https://${settings.data.domain || `example.com`}/#business`,
        name: settings.data.site_title || 'Fill In Site Title in CMS',
        description: settings.data.site_meta_description || undefined,
        address: {
          '@type': 'PostalAddress',
          '@id': `https://${settings.data.domain || `example.com`}/#address`,
          streetAddress: '1878 East Marlton Pike Suite 21878 NJ-70 #2',
          addressLocality: 'Cherry Hill',
          addressRegion: 'NJ',
          postalCode: '08003',
          addressCountry: 'USA',
        },
        telephone: '+1 (856) 675-2440',
        image:
          'https://images.prismic.io/rootedpsychotherapy/ZmDqhZm069VX1ftB_RootedPsychotherapyandCounseling_FF-01.jpg?auto=format,compress',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Psychotherapy services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Individual Therapy',
                url: `https://${settings.data.domain || `example.com`}/services/individual-therapy`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Couples Therapy',
                url: `https://${settings.data.domain || `example.com`}/services/couples-therapy`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Family Therapy',
                url: `https://${settings.data.domain || `example.com`}/services/family-therapy`,
              },
            },
          ],
        },
      },
      {
        '@type': 'Organization',
        '@id': `https://${settings.data.domain || `example.com`}/#org`,
        name: settings.data.site_title || undefined,
        address: {
          '@id': `https://${settings.data.domain || `example.com`}/#address`,
        },
        founder: 'Jennifer K. Boiler',
        telephone: '+1 (856) 675-2440',
        image:
          'https://images.prismic.io/rootedpsychotherapy/ZmDqhZm069VX1ftB_RootedPsychotherapyandCounseling_FF-01.jpg?auto=format,compress',
      },
      {
        '@type': 'WebPage',
        '@id': `https://${settings.data.domain || `example.com`}/`,
        url: `https://${settings.data.domain || `example.com`}/`,
        name: settings.data.site_title || undefined,
        datePublished: page.first_publication_date || undefined,
        dateModified: page.last_publication_date || undefined,
        description: settings.data.site_meta_description || undefined,
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `https://${settings.data.domain || `example.com`}/#website`,
          url: `https://${settings.data.domain || `example.com`}/`,
          name: settings.data.site_title || undefined,
          publisher: {
            '@type': 'Organization',
            '@id': `https://${settings.data.domain || `example.com`}/#org`,
          },
        },
      },
    ],
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')

  return {
    title: page.data.meta_title || settings.data.site_title,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
      siteName: settings.data.site_title || '',
    },
  }
}
