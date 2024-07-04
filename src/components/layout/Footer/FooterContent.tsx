import React from 'react'
import { LayoutDocumentData } from '../../../../prismicio-types'
import Section from '../Section'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'

type FooterContentProps = {
  data: LayoutDocumentData
}

const FooterContent = ({ data }: FooterContentProps): JSX.Element => {
  return (
    <Section
      as="footer"
      className="bg-gradient-to-b from-primary via-slate-900 to-slate-950 text-background mt-auto"
    >
      <SliceZone components={components} slices={data.slices1} />
    </Section>
  )
}

export default FooterContent
