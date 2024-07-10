/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_PROTO: "http",
        NEXT_PUBLIC_DOMAIN: "192.168.1.121",
        NEXT_PUBLIC_PORT: "3000",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sun9-66.userapi.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: process.env.NEXT_PUBLIC_PROTO,
                hostname: process.env.NEXT_PUBLIC_DOMAIN,
                port: process.env.NEXT_PUBLIC_PORT,
                pathname: '/**',
            },
        ],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
            {
                // matching all API routes
                source: "/new_api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
};


export default nextConfig;
