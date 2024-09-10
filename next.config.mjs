

/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

// Use an asynchronous function to handle the dynamic import
const withPWA = async () => {
  const nextPWA = (await import("next-pwa")).default;
  
  return nextPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: !prod,
  });
};

// Wrap the async import in an async function and export the final config
const getNextConfig = async () => {
  const nextPWAConfig = await withPWA();

  return nextPWAConfig({
    reactStrictMode: true,
    swcMinify: true,

    env: {
      SERVER_BASE_URL: process.env.API_URL,
      API_URL: process.env.API_URL,
      CLOUDFRONT_URL: process.env.CLOUDFRONT_URL,
      GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
      NEXT_PUBLIC_SOCKET_URL:
        process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "https://api.dokopi.com",
    },

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "plus.unsplash.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "i.ytimg.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "example.com",
          port: "",
        },
        {
          protocol: "https",
          hostname: "encrypted-tbn0.gstatic.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "two.satyamx55.bucket.s3.ap-south-1.amazonaws.com",
          port: "",
          pathname: "/xeroxstores/**",
        },
        {
          protocol: "https",
          hostname: "d28fpa5kkce5uk.cloudfront.net",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "user-images.githubusercontent.com",
          port: "",
          pathname: "/**",
        },
      ],
    },

    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
        {
          source: "/sw.js",
          headers: [
            {
              key: "Content-Type",
              value: "application/javascript; charset=utf-8",
            },
            {
              key: "Cache-Control",
              value: "no-cache, no-store, must-revalidate",
            },
            {
              key: "Content-Security-Policy",
              value: "default-src 'self'; script-src 'self'",
            },
          ],
        },
      ];
    },
  });
};

// Export the config wrapped in a promise
export default await getNextConfig();

