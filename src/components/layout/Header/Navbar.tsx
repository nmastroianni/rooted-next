'use client'
import { cn } from '@/lib/utils'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import {
  SettingsDocumentData,
  LayoutDocumentData,
} from '../../../../prismicio-types'
import Section from '../Section'
import CallNow from '@/components/layout/Header/CallNow'
import Menu from '@/components/layout/Header/Menu'
import MobileMenu from '@/components/layout/Header/MobileMenu'
import Logo from '@/components/layout/Header/Logo'

type NavbarProps = {
  data: LayoutDocumentData
  settings: SettingsDocumentData
}

const Navbar = ({ data, settings }: NavbarProps): JSX.Element => {
  const container = useRef(null)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', latest => {
    const previous: number = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else if (latest === 0) {
      setHidden(false)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      ref={container}
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={cn(
        'sticky top-0 z-20 w-full bg-primary transition duration-300 ease-in-out',
      )}
    >
      <Section width="xl">
        <div className="flex items-center justify-between">
          <Logo logo={data.logo} site_title={settings.site_title} />
          {data.slices.length > 0 && (
            <>
              <Menu data={data} className="hidden xl:block" />
              <MobileMenu
                data={data}
                className="flex items-center xl:hidden"
                site_title={settings.site_title}
                phone={settings.phone}
              />
            </>
          )}
          <CallNow
            label={data.cta_label}
            link={data.cta_link}
            className="hidden xl:flex"
          />
        </div>
      </Section>
    </motion.header>
  )
}

export default Navbar
