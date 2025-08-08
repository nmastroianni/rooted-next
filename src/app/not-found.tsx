'use client'

import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaFaceSurprise } from 'react-icons/fa6'

const NotFound = () => {
  return (
    <Section width="lg">
      <div className="flex flex-col items-center justify-center lg:h-[calc(100vh-108px)]">
        <FaFaceSurprise className="text-primary h-44 w-44" />
        <Heading as="h1" size="4xl" className="my-12 lg:text-center">
          Something went wrong!
        </Heading>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </Section>
  )
}

export default NotFound
