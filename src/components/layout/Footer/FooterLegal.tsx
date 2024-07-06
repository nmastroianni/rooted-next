import { PrismicNextLink } from '@prismicio/next'
import React from 'react'
import { LayoutDocumentData } from '../../../../prismicio-types'
import { createClient } from '@/prismicio'
import { FaCopyright } from 'react-icons/fa6'
import Copyright from './Copyright'
const FooterLegal = async (props: LayoutDocumentData) => {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <div>
      <div className="my-4 text-center lg:my-8">
        <PrismicNextLink field={props.privacy_link}>
          {props.privacy_label}
        </PrismicNextLink>
      </div>
      <div className="py-3 text-center text-xs lg:text-sm">
        {props.copyright_text}{' '}
        <FaCopyright className="-mt-1 inline h-3 w-3 text-background" />{' '}
        <Copyright /> {settings.data.site_title}
      </div>
    </div>
  )
}

export default FooterLegal
