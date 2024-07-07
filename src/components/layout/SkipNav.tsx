'use client'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const SkipNav = () => {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <Button
      variant={'secondary'}
      ref={ref}
      asChild
      className="fixed -left-36 top-36 z-10 transform transition duration-200 ease-in-out focus:translate-x-44"
      onClick={() => {
        if (ref.current) {
          ref.current.blur()
        }
      }}
    >
      <Link href="#main-content">Skip to Content</Link>
    </Button>
  )
}

export default SkipNav
