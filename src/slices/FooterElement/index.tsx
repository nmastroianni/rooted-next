import Section from '@/components/layout/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps, SliceZone } from '@prismicio/react'
import {
  FooterDocument,
  FooterElementSliceDefaultPrimary,
} from '../../../prismicio-types'
import { components } from '@/slices'
import { cn } from '@/lib/utils'

/**
 * Props for `FooterElement`.
 */
export type FooterElementProps = SliceComponentProps<Content.FooterElementSlice>

/**
 * Component for "FooterElement" Slices.
 */
const FooterElement = ({ slice }: FooterElementProps): JSX.Element => {
  const footerPrimary = slice.primary as FooterElementSliceDefaultPrimary
  const multiColumn = footerPrimary.layout as unknown as FooterDocument
  const cols =
    (multiColumn.data?.slices.length > 0 ? 1 : 0) +
    (multiColumn.data?.slices1.length > 0 ? 1 : 0) +
    (multiColumn.data?.slices2.length > 0 ? 1 : 0)
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {cols > 0 && (
        <div
          className={cn('my-4 grid gap-4 lg:my-8 lg:gap-8', {
            'lg:grid-cols-2': cols === 2,
            'lg:grid-cols-3': cols === 3,
          })}
        >
          {multiColumn.data.slices.length > 0 && (
            <div className="flex justify-center">
              <SliceZone
                slices={multiColumn.data.slices}
                components={components}
              />
            </div>
          )}
          {multiColumn.data.slices1.length > 0 && (
            <div className="flex flex-col justify-center gap-6 lg:flex-row">
              <SliceZone
                slices={multiColumn.data.slices1}
                components={components}
              />
            </div>
          )}
          {multiColumn.data.slices2.length > 0 && (
            <div className="flex justify-center">
              <SliceZone
                slices={multiColumn.data.slices2}
                components={components}
              />
            </div>
          )}
        </div>
      )}
    </Section>
  )
}

export default FooterElement
