import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { Button } from '@/components/ui/button'
import { HiArrowRight } from 'react-icons/hi'
import { JSX } from 'react'

/**
 * Props for `SubMenuItem`.
 */
export type SubMenuItemProps = SliceComponentProps<Content.SubMenuItemSlice>

/**
 * Component for "SubMenuItem" Slices.
 */
const SubMenuItem = ({ slice }: SubMenuItemProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === 'default' && (
        <Button
          asChild
          variant={slice.variation === 'default' ? 'link' : 'outline'}
        >
          <PrismicNextLink field={slice.primary.link}>
            {slice.primary.label}
            {slice.variation === 'default' && (
              <HiArrowRight className="h-4l ml-2 w-4" />
            )}
          </PrismicNextLink>
        </Button>
      )}
      {slice.variation === 'box' && (
        <PrismicNextLink
          field={slice.primary.link}
          className={cn(
            'hover:bg-secondary grid gap-2 rounded-lg border px-4 py-2 transition duration-300 ease-in-out',
          )}
        >
          <p className="text-primary text-sm font-medium">
            {slice.primary.label}
          </p>
          <p className="text-xs">{slice.primary.description}</p>
        </PrismicNextLink>
      )}
    </section>
  )
}

export default SubMenuItem
