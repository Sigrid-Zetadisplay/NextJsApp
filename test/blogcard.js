<article key={blogPost._id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={blogPost.date} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={blogPost.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {blogPost.category}
                </a>
              </div>


              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {blogPost.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
              </div>


              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">

                      <span className="absolute inset-0" />
                      By {blogPost.author}
                  </p>

                </div>
              </div>
            </article>