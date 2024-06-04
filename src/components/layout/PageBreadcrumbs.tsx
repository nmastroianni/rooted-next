import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { asText, RichTextField } from '@prismicio/client'

type PageBreadcrumbsProps = {
  segments: string[]
  title: RichTextField
}

const PageBreadcrumbs = ({ segments, title }: PageBreadcrumbsProps) => {
  return (
    <div className="mx-auto mt-8 max-w-screen-lg px-4 lg:mt-12 lg:w-full">
      <Breadcrumb className="my-3">
        <BreadcrumbList className="gap-3 sm:gap-4">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {segments.length > 0 &&
            segments.map((segment, index) => {
              if (index < segments.length - 1) {
                return (
                  <React.Fragment key={segment + index}>
                    <BreadcrumbItem className="capitalize">
                      <BreadcrumbLink href={`/${segment}`}>
                        {segment}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                )
              } else {
                return (
                  <BreadcrumbItem
                    key={asText(title) + index}
                    className="cursor-default"
                  >
                    {asText(title)}
                  </BreadcrumbItem>
                )
              }
            })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default PageBreadcrumbs
