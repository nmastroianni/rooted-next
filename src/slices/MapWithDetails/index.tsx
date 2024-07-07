import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `MapWithDetails`.
 */
export type MapWithDetailsProps =
  SliceComponentProps<Content.MapWithDetailsSlice>

/**
 * Component for "MapWithDetails" Slices.
 */
const MapWithDetails = ({ slice }: MapWithDetailsProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <div className="my-4 grid lg:my-8 lg:grid-cols-2">
        <div>
          <PrismicRichText field={slice.primary.details} />
        </div>
        <div className="min-h-[500px] overflow-hidden rounded-lg shadow-md lg:h-full">
          {slice.primary.map_url && (
            <iframe
              title="Map to our location"
              src={slice.primary.map_url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </Section>
  )
}

export default MapWithDetails
