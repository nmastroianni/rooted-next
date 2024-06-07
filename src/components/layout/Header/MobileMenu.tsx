import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { HiMenu } from 'react-icons/hi'
import { buttonVariants } from '@/components/ui/button'
import { KeyTextField, isFilled } from '@prismicio/client'
import {
  MenuItemSliceWithSubMenuPrimary,
  LayoutDocumentData,
  SubMenuDocument,
} from '../../../../prismicio-types'
import { PrismicNextLink } from '@prismicio/next'

type MobileMenuProps = {
  className?: string
  site_title: KeyTextField
  phone: KeyTextField
  data: LayoutDocumentData
}

const MobileMenu = ({
  className,
  data,
  phone,
  site_title,
}: MobileMenuProps): JSX.Element => {
  const { slices } = data
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger
          className={cn(
            'hover:bg-transparent',
            buttonVariants({ variant: 'link' })
          )}
        >
          <HiMenu className="text-primary-foreground h-8 w-8" />
          <span className="sr-only">Open Main Menu</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {isFilled.keyText(site_title) && (
              <SheetTitle className="font-bold text-primary">
                {site_title}
              </SheetTitle>
            )}
            {isFilled.keyText(phone) && (
              <p className="text-sm">
                <PrismicNextLink field={data.cta_link}>{phone}</PrismicNextLink>
              </p>
            )}
          </SheetHeader>

          <ul className="mt-8 grid gap-y-4">
            {slices.length > 0 &&
              slices.map((slice) => {
                if (slice.variation === 'withSubMenu') {
                  const slicePrimary =
                    slice.primary as MenuItemSliceWithSubMenuPrimary
                  const sub_menu =
                    slicePrimary.sub_menu as unknown as SubMenuDocument
                  const allSlices = [
                    ...sub_menu.data.slices,
                    ...(sub_menu.data?.slices1 ? sub_menu.data.slices1 : []),
                    ...(sub_menu.data?.slices2 ? sub_menu.data.slices2 : []),
                  ]
                  return (
                    <li key={slice.id}>
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          value={`${slice.primary.label}`}
                          className="border-none"
                        >
                          <AccordionTrigger
                            className={cn(
                              'flex justify-center rounded-lg border text-primary [&[data-state=open]]:mb-4',
                              buttonVariants({ variant: 'link' })
                            )}
                          >
                            {slice.primary.label}
                          </AccordionTrigger>
                          {allSlices.length > 0 &&
                            allSlices.map((subSlice, index) => {
                              if (subSlice.slice_type === 'sub_menu_item') {
                                return (
                                  <AccordionContent key={subSlice.id}>
                                    <SheetClose asChild>
                                      <PrismicNextLink
                                        field={subSlice.primary.link}
                                        className={cn(
                                          'w-full',
                                          buttonVariants({
                                            variant: 'outline',
                                          })
                                        )}
                                      >
                                        {subSlice.primary.label}
                                      </PrismicNextLink>
                                    </SheetClose>
                                  </AccordionContent>
                                )
                              }
                            })}
                        </AccordionItem>
                      </Accordion>
                    </li>
                  )
                }
                return (
                  <li key={slice.id}>
                    <SheetClose asChild>
                      <Button asChild variant={'outline'} className="flex">
                        <PrismicNextLink field={slice.primary.link}>
                          {slice.primary.label}
                        </PrismicNextLink>
                      </Button>
                    </SheetClose>
                  </li>
                )
              })}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu
