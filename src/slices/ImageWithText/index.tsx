import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({ slice }: ImageWithTextProps): JSX.Element => {
  const listPresent =
    isFilled.richText(slice.primary.left_list) ||
    isFilled.richText(slice.primary.right_list)
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
      className={cn('py-6 lg:py-12', {
        'bg-secondary': slice.primary.background,
      })}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div
          className={cn('order-1 flex flex-col justify-center', {
            'order-2': slice.variation === 'rightImage',
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className="rounded-lg shadow"
            quality={85}
          />
        </div>
        <div
          className={cn('order-2 mx-auto max-w-prose', {
            'order-1': slice.variation === 'rightImage',
          })}
        >
          <PrismicRichText field={slice.primary.heading} />
          <PrismicRichText field={slice.primary.description} />
          {listPresent && (
            <div
              className={cn('grid', {
                'gap-2 lg:grid-cols-2':
                  isFilled.richText(slice.primary.left_list) &&
                  isFilled.richText(slice.primary.right_list),
              })}
            >
              {isFilled.richText(slice.primary.left_list) && (
                <PrismicRichText field={slice.primary.left_list} />
              )}
              {isFilled.richText(slice.primary.right_list) && (
                <PrismicRichText field={slice.primary.right_list} />
              )}
            </div>
          )}
          {isFilled.group(slice.primary.buttons) && (
            <div className="mt-8 flex justify-center gap-4 lg:mt-12 lg:gap-8">
              {slice.primary.buttons.map((button, i) => {
                return (
                  <Button
                    key={slice.id + i}
                    asChild
                    variant={button.button_style || 'default'}
                  >
                    <PrismicNextLink field={button.button_link}>
                      {button.button_label}
                    </PrismicNextLink>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

export default ImageWithText
