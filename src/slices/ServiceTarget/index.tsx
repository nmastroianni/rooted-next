import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { asText, Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { Ultra } from 'next/font/google'

/**
 * Props for `ServiceTarget`.
 */
export type ServiceTargetProps = SliceComponentProps<Content.ServiceTargetSlice>

/**
 * Component for "ServiceTarget" Slices.
 */
const ServiceTarget = ({ slice }: ServiceTargetProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
    >
      {isFilled.group(slice.primary.targets) && (
        <ul className={cn('flex flex-wrap justify-center gap-4 lg:gap-8')}>
          {slice.primary.targets.map((target, i) => {
            return (
              <li key={slice.id + asText(target.target_title) + i}>
                <Card className="max-w-lg">
                  <CardHeader className="relative flex min-h-40 flex-col justify-center">
                    <PrismicNextImage
                      field={target.target_image}
                      fill
                      className="rounded-t-xl object-cover opacity-20"
                    />
                    <PrismicRichText
                      field={target.target_title}
                      components={{
                        heading2: ({ children }) => (
                          <Heading as="h2" size="3xl" className="z-10">
                            {children}
                          </Heading>
                        ),
                      }}
                    />
                  </CardHeader>
                  <CardContent>
                    <PrismicRichText field={target.target_description} />
                    <PrismicRichText
                      field={target.issue_list}
                      components={{
                        list: ({ children }) => {
                          return (
                            <ul className="flex max-w-prose list-disc flex-col flex-wrap items-center gap-4 lg:flex-row lg:text-xl">
                              {children}
                            </ul>
                          )
                        },
                        listItem: ({ children }) => {
                          return (
                            <li className="ml-4 md:ml-6 lg:ml-8 xl:ml-10">
                              {children}
                            </li>
                          )
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}

export default ServiceTarget
