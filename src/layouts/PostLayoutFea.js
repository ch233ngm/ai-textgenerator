import PageTitle from '../components/PageTitle'
import SectionContainer from '../components/SectionContainer'
import ScrollTopAndComment from '../components/ScrollTopAndComment'

const postDateTemplate = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export default function PostLayout({ content, authorDetails, next, prev, children }) {
  const { path, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString('en-US', postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 xl:col-span-4 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10">{children}</div>
              <div className="pb-6 pt-6 text-sm text-gray-700">
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
