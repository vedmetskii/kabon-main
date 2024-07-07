export const siteConfig: SiteConfig = {
    apiUrl: process.env.API_URL ?? 'http://localhost:3000',
    proto: process.env.PROTO ?? "http",
    domain: process.env.DOMAIN ?? "localhost:3000"
}