import { createClient } from '@/prismicio'
import React from 'react'
import { LayoutDocumentData } from '../../../../prismicio-types'
import FooterContent from './FooterContent'

const Footer = async () => {
  const client = createClient()
  const layout = await client.getSingle('layout', {
    graphQuery: `
    {
      layout {
        copyright_text
        privacy_label
        privacy_link
        slices1 {
          ...on footer_element {
            variation {
              ...on default {
                primary {
                  layout {
                    slices
                    slices1
                    slices2
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
  })
  const footerData: LayoutDocumentData = layout.data
  return (
    <>
      <FooterContent data={footerData} />
    </>
  )
}

export default Footer
