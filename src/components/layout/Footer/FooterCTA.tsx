import React from 'react'
import Section from '../Section'
import Heading from '@/components/typography/Heading'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { isFilled, KeyTextField, LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'

const FooterCTA = ({
  cta,
  label,
  link,
}: {
  cta: KeyTextField
  label: KeyTextField
  link: LinkField
}) => {
  return (
    <Section width="lg">
      <div className="flex flex-col items-center gap-y-6">
        <Heading as="h2" size="3xl" className="text-background">
          {cta || 'Take the first step now'}
        </Heading>
        {isFilled.link(link) && (
          <PrismicNextLink
            field={link}
            className={cn(buttonVariants({ variant: 'secondary' }))}
          >
            {label || 'Get Started'}
          </PrismicNextLink>
        )}
      </div>
    </Section>
  )
}

export default FooterCTA
