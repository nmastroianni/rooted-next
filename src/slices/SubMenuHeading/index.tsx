import Heading from '@/components/typography/Heading'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { JSX } from 'react'

/**
 * Props for `SubMenuHeading`.
 */
export type SubMenuHeadingProps =
  SliceComponentProps<Content.SubMenuHeadingSlice>

/**
 * Component for "SubMenuHeading" Slices.
 */
const SubMenuHeading = ({ slice }: SubMenuHeadingProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="2xl" className="pb-2">
        {slice.primary.heading}
      </Heading>
    </section>
  )
}

export default SubMenuHeading
