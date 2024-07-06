import { createClient } from '@/prismicio'
import { asDate } from '@prismicio/client'
export default async function sitemap() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const pages = await client.getAllByType('page')
  const sitemapPages = pages.map(page => ({
    url: `https://${settings.data.domain || `example.com`}${page.url}`,
    lastModified: asDate(page.last_publication_date),
  }))
  const homepage = await client.getSingle('homepage')
  const sitemapHomepage = {
    url: `https://${settings.data.domain || `example.com`}${homepage.url}`,
    lastModified: asDate(homepage.last_publication_date),
  }
  const services = await client.getAllByType('service')
  const sitemapServices = services.map(service => ({
    url: `https://${settings.data.domain || `example.com`}${service.url}`,
    lastModified: asDate(service.last_publication_date),
  }))

  const clinicians = await client.getAllByType('clinician')
  const sitemapClinicians = clinicians.map(clinician => ({
    url: `https://${settings.data.domain || `example.com`}${clinician.url}`,
    lastModified: asDate(clinician.last_publication_date),
  }))

  return [
    sitemapHomepage,
    ...sitemapPages,
    ...sitemapServices,
    ...sitemapClinicians,
  ]
}
