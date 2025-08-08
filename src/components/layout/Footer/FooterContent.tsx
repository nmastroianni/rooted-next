import React from 'react'
import { LayoutDocumentData } from '../../../../prismicio-types'
import Section from '../Section'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'
import FooterLegal from './FooterLegal'
import FooterCTA from './FooterCTA'
import { isFilled } from '@prismicio/client'

type FooterContentProps = {
  data: LayoutDocumentData
}

const FooterContent = ({ data }: FooterContentProps): JSX.Element => {
  return (
    <Section
      as="footer"
      className="mt-auto bg-linear-to-b from-primary via-slate-900 to-slate-950 text-background"
    >
      {isFilled.keyText(data.footer_cta) && (
        <FooterCTA
          cta={data.footer_cta}
          label={data.footer_cta_label}
          link={data.footer_cta_link}
        />
      )}
      <SliceZone components={components} slices={data.slices1} />
      <FooterLegal {...data} />
    </Section>
  )
}

export default FooterContent
