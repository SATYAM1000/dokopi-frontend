export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/stores", "/stores/*"],
      disallow: [],
    },
    sitemap: "https://dokopi.com/sitemap.xml",
  };
}
