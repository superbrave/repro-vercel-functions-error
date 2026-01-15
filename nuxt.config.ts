// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    SYLIUS_BASE: process.env.SYLIUS_BASE,
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: "append",
      },
    },
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
    "/:locale/winkelwagen/**": {
      isr: false,
      proxy: {
        to: `https://test--dokteronline.sbpreview.nl/checkout/index.html`,
      },
    },
    "/checkoutAssets/**": {
      isr: false,
      proxy: {
        to: `https://test--dokteronline.sbpreview.nl/checkout/checkoutAssets/**`,
      },
    },
  },
});
