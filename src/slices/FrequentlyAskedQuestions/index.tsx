import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { cn } from '@/lib/utils'
import { asText, Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { JSX } from 'react'

/**
 * Props for `FrequentlyAskedQuestions`.
 */
export type FrequentlyAskedQuestionsProps =
  SliceComponentProps<Content.FrequentlyAskedQuestionsSlice>

/**
 * Component for "FrequentlyAskedQuestions" Slices.
 */
const FrequentlyAskedQuestions = ({
  slice,
}: FrequentlyAskedQuestionsProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="md"
      className="py-8 lg:pb-16"
    >
      <div className="flex justify-center">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <Heading
                as="h2"
                size="5xl"
                className={cn('py-4 lg:py-8 lg:text-center')}
              >
                {children}
              </Heading>
            ),
          }}
        />
      </div>
      {isFilled.group(slice.primary.questions) && (
        <Accordion
          type="multiple"
          className="bg-secondary my-6 rounded-lg px-4 lg:my-12"
        >
          {slice.primary.questions.map((item, index) => (
            <AccordionItem
              key={slice.id + index}
              value={asText(item.question)}
              className="border-none"
            >
              <AccordionTrigger>
                {isFilled.richText(item.question) ? (
                  <PrismicRichText
                    field={item.question}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="prose dark:prose-invert lg:prose-lg xl:prose-xl pr-4 text-left font-semibold">
                          {children}
                        </p>
                      ),
                    }}
                  />
                ) : (
                  <p>Question Missing in CMS</p>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {isFilled.richText(item.answer) ? (
                  <PrismicRichText
                    field={item.answer}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="prose dark:prose-invert lg:prose-lg my-1.5 lg:my-3">
                          {children}
                        </p>
                      ),
                    }}
                  />
                ) : (
                  <p>Missing Answer in CMS</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Section>
  )
}

export default FrequentlyAskedQuestions
