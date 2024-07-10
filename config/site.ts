export const siteConfig: SiteConfig = {
    apiUrl: process.env.API_URL ?? 'http://localhost:3000',
    proto: process.env.NEXT_PUBLIC_PROTO ?? "",
    domain: process.env.NEXT_PUBLIC_DOMAIN ?? "",
    port: process.env.NEXT_PUBLIC_PORT ?? "",
    maxPostsOnPageNews: Number(process.env.NEXT_PUBLIC_MAX_POSTS_ON_PAGE_NEWS) ?? 4,
}