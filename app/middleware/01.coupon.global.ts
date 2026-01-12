export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return;
  }

  const route = useRoute();
  const router = useRouter();
  const couponCode = route.query.couponCode;
  const processed = useState<string | null>(
    "coupon-already-processed",
    () => null
  );

  if (typeof couponCode === "string" && couponCode.trim() !== "") {
    console.info("[Coupon Middleware] Applying coupon code:", couponCode);
    processed.value = couponCode;

    const { addCouponCodeToCart } = useCartActions();
    const cookieLanguage = useCookie("dokLanguage");
    const cookieCountry = useCookie("dokCountry");

    const config = useRuntimeConfig();
    const fallbackLanguage = config.public.supportsLocale ? "" : "nl";
    const fallbackCountry = config.public.supportsLocale ? "" : "BE";

    localStorage.setItem("test", "test");

    await addCouponCodeToCart(
      couponCode,
      cookieLanguage.value || fallbackLanguage,
      cookieCountry.value || fallbackCountry
    );

    // Keep the current coupon code in the URL to show which one is applied
    router.replace({
      path: route.path,
      query: route.query,
    });
  }
});
