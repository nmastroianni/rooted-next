import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { JSX } from 'react'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice, index }: HeroProps): JSX.Element => {
  return (
    <Section
      as="div"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn('text-primary-foreground relative', {
        'bg-primary': slice.variation === 'default',
        'lg:h-[calc(100vh-108px)] lg:min-h-[750px]':
          slice.variation !== 'contentHeight',
      })}
    >
      {slice.variation !== 'default' && isFilled.image(slice.primary.image) && (
        <PrismicNextImage
          field={slice.primary.image}
          fallbackAlt=""
          fill
          sizes="100vw"
          className="z-[-2] object-cover"
          priority={index === 0}
        />
      )}
      <div
        className={cn(
          'mx-auto my-8 flex max-w-(--breakpoint-2xl) flex-col items-center justify-center rounded-lg p-6 backdrop-blur-sm lg:p-12',
          {
            'bg-background/80': slice.variation !== 'default',
          },
        )}
      >
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as={index === 0 ? 'h1' : 'h2'}
                  size="6xl"
                  className={cn('text-primary lg:text-center', {
                    'text-primary-foreground': slice.variation === 'default',
                  })}
                >
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        {isFilled.richText(slice.primary.sub_heading) && (
          <PrismicRichText
            field={slice.primary.sub_heading}
            components={{
              paragraph: ({ children }) => (
                <p className="text-foreground mt-6 text-center text-2xl lg:text-3xl">
                  {children}
                </p>
              ),
            }}
          />
        )}

        {slice.primary.buttons.length > 0 && (
          <div className="flex flex-col flex-wrap justify-evenly gap-6 lg:flex-row">
            {slice.primary.buttons.map(button => {
              return (
                <Button
                  key={slice.id + button.button_label}
                  asChild
                  variant={button.button_style || 'default'}
                  size="lg"
                  className={cn('mt-4 lg:mt-8', {
                    'border-background bg-primary border-2':
                      button.button_style === 'outline',
                    'text-primary':
                      button.button_style === 'link' ||
                      button.button_style === 'ghost',
                  })}
                >
                  <PrismicNextLink field={button.button_link}>
                    {button.button_label || 'Missing Button Label'}
                  </PrismicNextLink>
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </Section>
  )
}

export default Hero
