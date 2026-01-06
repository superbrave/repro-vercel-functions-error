// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    SYLIUS_BASE: process.env.SYLIUS_BASE,
  },
  routeRules: {
    "/": {
      isr: 300,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Netlify-CDN-Cache-Control":
          "no-cache, no-store, must-revalidate, max-age=0, stale-while-revalidate=0",
      },
    },
    "/**": {
      isr: 300,
      headers: {
        // Cache for 5 minutes, stale for 7 days (while being revalidated/refreshed in the background)
        // The durable directive is used to share the cache across all edge nodes.
        // See: https://docs.netlify.com/platform/caching/#stale-while-revalidate-directive
        "Netlify-CDN-Cache-Control":
          "public, durable, max-age=300, stale-while-revalidate=604800",
        // Differentiate caching for personalization and search queries
        "Netlify-Vary":
          "query=prepr_preview_ab|prepr_preview_segment|q,cookie=__prepr_uid",

        // Vercel only
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=604800",
        Vary: "Cookie",
      },
    },
    "/api/**": {
      isr: 300,
      headers: {
        "Netlify-Vary": "query",
      },
    },
  },
});
