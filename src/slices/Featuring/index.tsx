import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Featuring`.
 */
export type FeaturingProps = SliceComponentProps<Content.FeaturingSlice>

/**
 * Component for "Featuring" Slices.
 */
const Featuring = ({ slice }: FeaturingProps): JSX.Element => {
  const headPresent =
    isFilled.richText(slice.primary.heading) ||
    isFilled.richText(slice.primary.description)
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
      className="py-6 lg:py-12"
    >
      {headPresent && (
        <div className="prose mx-auto lg:prose-lg xl:prose-xl">
          {isFilled.richText(slice.primary.heading) && (
            <PrismicRichText field={slice.primary.heading} />
          )}
          {isFilled.richText(slice.primary.description) && (
            <PrismicRichText field={slice.primary.description} />
          )}
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
        {isFilled.group(slice.primary.features) && (
          <>
            {slice.primary.features.map((feature, i) => {
              return (
                <Card key={slice.id + i} className="min-w-[350px] max-w-md">
                  {slice.variation === 'default' && (
                    <CardHeader className="relative min-h-48 overflow-hidden">
                      {'image' in feature && (
                        <PrismicNextImage
                          field={feature.image}
                          fill
                          className="rounded-t-lg object-cover"
                        />
                      )}
                    </CardHeader>
                  )}
                  <CardContent>
                    <PrismicRichText
                      field={feature.feature_heading}
                      components={{
                        heading3: ({ children }) => (
                          <Heading
                            as="h3"
                            size="3xl"
                            className="py-3 lg:text-center"
                          >
                            {children}
                          </Heading>
                        ),
                      }}
                    />

                    {isFilled.richText(feature.feature_description) && (
                      <PrismicRichText field={feature.feature_description} />
                    )}
                  </CardContent>
                  {isFilled.link(feature.button_link) &&
                    isFilled.keyText(feature.button_label) && (
                      <CardFooter className="flex justify-center">
                        <PrismicNextLink
                          field={feature.button_link}
                          className={cn(buttonVariants({ variant: 'default' }))}
                          aria-label={feature.button_alt || ''}
                        >
                          {feature.button_label}
                        </PrismicNextLink>
                      </CardFooter>
                    )}
                </Card>
              )
            })}
          </>
        )}
      </div>
    </Section>
  )
}

export default Featuring
