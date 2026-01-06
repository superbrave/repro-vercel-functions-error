// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": {
      isr: 300,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
    "/**": {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=604800",

        Vary: "Cookie",
      },
    },
    "/api/**": {
      isr: true,
      headers: {
        "Netlify-Vary": "query",
      },
    },
  },
});
