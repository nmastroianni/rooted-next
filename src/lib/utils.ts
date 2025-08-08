import { clsx, type ClassValue } from 'clsx'
import { createClient } from '@/prismicio'
import { ListItem, Organization } from 'schema-dts'
import { twMerge } from 'tailwind-merge'
import {
  ClinicianDocument,
  PageDocument,
  ServiceDocument,
} from '../../prismicio-types'
import { KeyTextField } from '@prismicio/client'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getUrlSegments(url: string | null): string[] {
  // Check if the URL parameter is null
  if (url === null) {
    console.error('URL parameter is null.')
    return []
  }

  // Remove leading and trailing slashes and split the URL by '/'
  const segments = url.replace(/^\/|\/$/g, '').split('/')

  // Filter out any empty segments
  const filteredSegments = segments.filter(segment => segment !== '')

  return filteredSegments
}

export const getOrganization = async () => {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const org: Organization = {
    '@type': 'Organization',
    '@id': `https://${settings.data.domain || `example.com`}/#org`,
    name: settings.data.site_title || undefined,
    address: {
      '@type': 'PostalAddress',
      '@id': `https://${settings.data.domain || `example.com`}/#address`,
      streetAddress: '1878 East Marlton Pike Suite 21878 NJ-70 #2',
      addressLocality: 'Cherry Hill',
      addressRegion: 'NJ',
      postalCode: '08003',
      addressCountry: 'USA',
    },
    founder: 'Jennifer K. Boiler',
    telephone: '+1 (856) 675-2440',
    image:
      'https://images.prismic.io/rootedpsychotherapy/ZmDqhZm069VX1ftB_RootedPsychotherapyandCounseling_FF-01.jpg?auto=format,compress',
  }
  return org
}

export const generateBreadcrumbs = (
  domain: KeyTextField,
  page: PageDocument | ClinicianDocument | ServiceDocument,
  segments: string[],
) => {
  const crumbs = segments.map((item, i) => {
    const crumb: ListItem = {
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@id': `https://${domain || `example.com`}${page.url}#${item}`,
        name: item,
      },
    }
    return crumb
  })
  return crumbs
}
