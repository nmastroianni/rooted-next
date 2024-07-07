import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { ImageField, SelectField, asText, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { HiArrowRight } from 'react-icons/hi'
import Link from 'next/link'
import { ClinicianDocument, ServiceDocument } from '../../prismicio-types'
import Pagination from '@/components/Pagination'
import { PrismicRichText } from './typography/PrismicRichText'
import { badgeVariants } from './ui/badge'
import { buttonVariants } from './ui/button'
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
      <ul>
        {results.length > 0 &&
          results.map((item, i) => {
            return (
              <li
                key={item.id}
                className={cn('rounded-lg p-4 lg:p-8', {
                  'bg-secondary shadow': i % 2 === 0,
                })}
              >
                <Link
                  href={item.url || '#'}
                  className="flex flex-col justify-between border-t border-t-secondary py-10 md:items-start"
                  aria-label={
                    asText(
                      item.type === 'service'
                        ? item.data.title
                        : item.data.full_name,
                    ) || 'View the content'
                  }
                >
                  <div
                    className={
                      'flex w-full flex-col justify-between md:flex-row md:items-center'
                    }
                  >
                    <div className="flex flex-col gap-y-3">
                      <PrismicRichText
                        field={
                          item.type === 'service'
                            ? item.data.title
                            : item.data.full_name
                        }
                      />
                      <div className="mb-6 flex gap-3">
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
                          item.type === 'service'
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
                    {item.data.meta_description ? (
                      <div className="prose my-4 shrink lg:prose-lg">
                        {item.data.meta_description}
                      </div>
                    ) : null}
                    <PrismicNextImage
                      field={
                        item.type === 'clinician'
                          ? item.data.portrait
                          : item.data.meta_image
                      }
                      imgixParams={{ ar: '1:1', fit: 'crop' }}
                      quality={75}
                      width={300}
                      className="hidden rounded-lg shadow lg:inline"
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
