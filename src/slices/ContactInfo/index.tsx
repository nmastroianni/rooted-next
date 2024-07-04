import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ContactInfo`.
 */
export type ContactInfoProps = SliceComponentProps<Content.ContactInfoSlice>

/**
 * Component for "ContactInfo" Slices.
 */
const ContactInfo = ({ slice }: ContactInfoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col justify-evenly"
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <Heading as="h2" size="3xl" className="text-background pb-4">
              {children}
            </Heading>
          ),
        }}
      />
      <PrismicRichText
        field={slice.primary.details}
        components={{
          paragraph: ({ children }) => (
            <p className="prose md:prose-lg prose-a:text-background text-background">
              {children}
            </p>
          ),
        }}
      />
    </section>
  )
}

export default ContactInfo
