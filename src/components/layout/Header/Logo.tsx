import { cn } from '@/lib/utils'
import { ImageField, KeyTextField, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
type PhoneTitleProps = {
  site_title: KeyTextField
  logo?: ImageField
}
const Logo = ({ logo, site_title }: PhoneTitleProps): JSX.Element => {
  return (
    <div className="text-primary-foreground">
      <div className="flex items-center gap-2">
        <div>
          <>
            {isFilled.keyText(site_title) && (
              <Link href="/">
                <PrismicNextImage field={logo} width={157} />
                {!isFilled.image(logo) && (
                  <h1 className={cn('text-xl font-black')}>{site_title}</h1>
                )}
              </Link>
            )}
          </>
        </div>
      </div>
    </div>
  )
}

export default Logo
