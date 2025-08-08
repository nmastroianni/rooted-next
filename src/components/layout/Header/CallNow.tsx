import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { KeyTextField, LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { JSX } from 'react'

type CallNowProps = {
  label: KeyTextField
  link: LinkField
  className?: string
}
const CallNow = ({ label, link, className }: CallNowProps): JSX.Element => {
  return (
    <div className={cn('flex justify-end', className)}>
      <Button variant={'outline'} asChild>
        <PrismicNextLink field={link}>{label}</PrismicNextLink>
      </Button>
    </div>
  )
}

export default CallNow
