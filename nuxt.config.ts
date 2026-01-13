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
      },
    },
    "/**": {
      isr: 300,
      headers: {
        // Vercel only
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=604800",
        Vary: "Cookie",
      },
    },
    "/api/**": {
      isr: {
        expiration: 300,
        passQuery: true,
        allowQuery: [
          "country",
          "language",
          "couponCode",
          "tokenValue",
          "jwt_token",
          "status",
        ],
      },
    },
  },
});
