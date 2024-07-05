import ContentList from '@/components/ContentList'
import Section from '@/components/layout/Section'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'
import { FaSpinner } from 'react-icons/fa6'

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>
type contextProps = {
  page?: number
}
/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = ({ slice, context }: ContentIndexProps): JSX.Element => {
  const { page } = context as contextProps
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
    >
      <Suspense
        fallback={
          <div className="grid min-h-[calc(100vh-140px)] place-content-center">
            <FaSpinner className="h-32 w-32" />
          </div>
        }
      >
        <ContentList
          contentType={slice.primary.content_type}
          display={slice.primary.number_to_display || undefined}
          page={page || undefined}
          ctaText={
            isFilled.keyText(slice.primary.content_cta_text)
              ? slice.primary.content_cta_text
              : 'Read More'
          }
          fallbackItemImage={slice.primary.fallback_item_image}
        />
      </Suspense>
    </Section>
  )
}

export default ContentIndex
