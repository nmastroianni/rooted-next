import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { HiPhone, HiMail } from 'react-icons/hi'

/**
 * Props for `FooterLogo`.
 */
export type FooterLogoProps = SliceComponentProps<Content.FooterLogoSlice>

/**
 * Component for "FooterLogo" Slices.
 */
const FooterLogo = ({ slice }: FooterLogoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col justify-evenly"
    >
      <PrismicNextImage field={slice.primary.logo} />
      {slice.primary.buttons.length > 0 && (
        <>
          <ul className="flex gap-4 py-3 justify-center">
            {slice.primary.buttons.map((button, i) => {
              return (
                <li
                  key={
                    button.accessibility_text
                      ? button.accessibility_text
                      : 'footerbutton' + i
                  }
                >
                  <PrismicNextLink
                    field={button.button_link}
                    aria-label={button.accessibility_text || 'contact us'}
                    className={buttonVariants({ variant: 'default' })}
                  >
                    {button.icon === 'envelope' ? (
                      <HiMail className="w-5 h-5" />
                    ) : (
                      <HiPhone className="w-5 h-5" />
                    )}
                  </PrismicNextLink>
                </li>
              )
            })}
          </ul>
        </>
      )}
      {isFilled.link(slice.primary.cta_link) && (
        <PrismicNextLink
          field={slice.primary.cta_link}
          className={cn('mt-3', buttonVariants({ variant: 'secondary' }))}
        >
          {slice.primary.cta_label}
        </PrismicNextLink>
      )}
    </section>
  )
}

export default FooterLogo
