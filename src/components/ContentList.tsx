import Pagination from '@/components/Pagination'
import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { ImageField, SelectField, asText } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import { PrismicRichText } from './typography/PrismicRichText'
import { badgeVariants } from './ui/badge'
import { buttonVariants } from './ui/button'
import { JSX } from 'react'
type ContentListProps = {
  contentType: SelectField
  page: number | undefined
  display: number | undefined
  ctaText?: string
  fallbackItemImage: ImageField
}

const ContentList = async ({
  contentType,
  ctaText = 'Read More',
  display = 5,
  fallbackItemImage,
  page = 1,
}: ContentListProps): Promise<JSX.Element> => {
  const client = createClient()
  let prismicData
  if (contentType === 'service') {
    prismicData = await client.getByType('service', {
      orderings: {
        field: 'my.service.title',
        direction: 'asc',
      },
      page: page,
      pageSize: display,
    })
  } else if (contentType === 'post') {
    prismicData = await client.getByType('post', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: page,
      pageSize: display,
    })
  } else {
    prismicData = await client.getByType('clinician', {
      orderings: {
        field: 'my.clinician.first_name',
        direction: 'asc',
      },
      page: page,
      pageSize: display,
    })
  }
  const { results } = prismicData

  return (
    <>
      <ul className="grid gap-y-4">
        {results.length > 0 &&
          results.map((item, i) => {
            return (
              <li
                key={item.id}
                className={cn('rounded-lg p-4 shadow-sm', {
                  'bg-secondary': i % 2 === 0,
                })}
              >
                <Link
                  href={item.url || '#'}
                  className="flex flex-col justify-between lg:items-start"
                  aria-label={
                    asText(
                      item.type === 'service' || item.type === 'post'
                        ? item.data.title
                        : item.data.full_name,
                    ) || 'View the content'
                  }
                >
                  <div
                    className={
                      'flex w-full flex-col justify-between lg:flex-row lg:items-center'
                    }
                  >
                    <div className="flex flex-col gap-y-3">
                      <PrismicRichText
                        field={
                          item.type === 'service' || item.type === 'post'
                            ? item.data.title
                            : item.data.full_name
                        }
                      />
                      <div className="mb-6 flex justify-center gap-3 lg:justify-start">
                        {item.tags.length > 0 &&
                          item.tags.map(tag => (
                            <span
                              key={item.id + tag}
                              className={cn(
                                'block',
                                badgeVariants({
                                  variant:
                                    i % 2 === 0 ? 'default' : 'secondary',
                                }),
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'my-6 md:my-0',
                        buttonVariants({ variant: 'outline' }),
                      )}
                    >
                      {ctaText}{' '}
                      <span className="sr-only">
                        : Read{' '}
                        {asText(
                          item.type === 'service' || item.type === 'post'
                            ? item.data.title
                            : item.data.full_name,
                        )}
                      </span>
                      <HiArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div
                    className={cn(
                      'flex w-full flex-col items-center justify-between gap-x-8 lg:flex-row',
                      { 'lg:flex-row-reverse': i % 2 === 0 },
                    )}
                  >
                    {item.type === 'post' || item.data.meta_description ? (
                      <div className="prose lg:prose-lg my-4 shrink">
                        {item.type === 'post'
                          ? item.data.excerpt
                          : item.data.meta_description}
                      </div>
                    ) : null}
                    <PrismicNextImage
                      field={
                        item.type === 'clinician'
                          ? item.data.portrait
                          : item.type === 'post'
                            ? item.data.featured_image
                            : item.data.meta_image
                      }
                      imgixParams={{ ar: '1:1', fit: 'crop' }}
                      quality={75}
                      width={200}
                      className="hidden rounded-lg shadow-sm lg:inline"
                    />
                  </div>
                </Link>
              </li>
            )
          })}
      </ul>
      {prismicData.total_pages > 1 && (
        <Pagination
          hasNextPage={prismicData?.next_page !== null}
          hasPrevPage={prismicData?.prev_page !== null}
          totalPages={prismicData?.total_pages}
        />
      )}
    </>
  )
}

export default ContentList
