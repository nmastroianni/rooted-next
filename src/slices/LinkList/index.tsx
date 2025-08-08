import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { JSX } from 'react'

/**
 * Props for `LinkList`.
 */
export type LinkListProps = SliceComponentProps<Content.LinkListSlice>

/**
 * Component for "LinkList" Slices.
 */
const LinkList = ({ slice, index }: LinkListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-1 flex-col items-center py-4 lg:items-start lg:py-0"
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <Heading as="h2" size="3xl" className="pb-4 text-background">
              {children}
            </Heading>
          ),
        }}
      />
      {slice.primary.links.length > 0 && (
        <ul className="prose-a:text-background">
          {slice.primary.links.map((link, i) => {
            return (
              <li key={link.label ? link.label : 'linklist' + index + i}>
                <PrismicNextLink
                  field={link.link}
                  className={cn(buttonVariants({ variant: 'link' }))}
                >
                  {link.label}
                </PrismicNextLink>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default LinkList
