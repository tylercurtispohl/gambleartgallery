This is a Next.js website built for San Francisco Bay Area based artist, Kirsten Gamble. It is hosted at [gambleartgallery.com](https://gambleartgallery.com).

- It is built with Next.js 14 using the App Router
- It is integrated with Sanity.io for content management. See /app/lib/data.ts to see how data is fetched from Sanity.io.
- When content is changed, a webhook from [Sanity.io](http://Sanity.io) calls an API endpoint that revalidates the Next.js cache. So content is updated immediately but the server is otherwise able to cache data indefinitely for optimal performance. This endpont can be seen at /app/api/revalidate/route.ts.
