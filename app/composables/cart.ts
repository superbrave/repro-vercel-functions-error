import type { UseFetchOptions } from "nuxt/app";

export function useCartActions() {
  async function createCart(language: string, country: string) {
    let jwtToken = localStorage.getItem("jwt_token");

    const fetchOptions: UseFetchOptions<unknown> = {
      method: "POST",
      params: {
        localeCode: `${language}-${country}`,
        language,
        country,
        affiliateId: undefined,
      },
    };

    if (jwtToken) {
      fetchOptions.headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }

    const { data, error } = await useFetch(
      "https://dokteronline.commerce.sbtest.nl/api/sylius-create-cart",
      fetchOptions
    );

    if (error.value?.statusCode === 401) {
      localStorage.removeItem("jwt_token");
      jwtToken = null;

      await createCart(language, country);
      return;
    }

    if (
      (data.value as { tokenValue?: string })?.tokenValue &&
      import.meta.client
    ) {
      localStorage.setItem(
        "tokenValue",
        (data.value as { tokenValue: string }).tokenValue
      );
    }

    return data;
  }

  const addCouponCodeToCart = async (
    couponCode: string,
    language: string,
    country: string
  ): Promise<{ success: boolean; error?: string }> => {
    const jwtToken = localStorage.getItem("jwt_token");
    let tokenValue = localStorage.getItem("tokenValue");

    if (!country || !language) {
      const error = "site.coupon.general-error";
      console.error(error);

      return { success: false, error };
    }

    if (!tokenValue) {
      await createCart(language, country);
      tokenValue = localStorage.getItem("tokenValue");
    }

    const fetchOptions: UseFetchOptions<unknown> = {
      method: "POST",
      params: {
        language,
        country,
        tokenValue,
        couponCode,
      },
    };

    if (jwtToken) {
      fetchOptions.headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }

    const { error } = await useFetch(
      "https://dokteronline.commerce.sbtest.nl/api/sylius-add-coupon",
      fetchOptions
    );

    // When the response is a 404 it means the cart does not exist.
    // We need to create a new cart and add the coupon code to it.
    if (error.value?.statusCode === 404) {
      await createCart(language, country);
      tokenValue = localStorage.getItem("tokenValue");
      await addCouponCodeToCart(couponCode, language, country);

      return { success: false };
    }

    if (error.value) {
      const errorMessage = "site.coupon.not-found";
      console.error(errorMessage);

      return { success: false, error: errorMessage };
    }

    console.info("site.coupon.successfully-applied");

    return { success: true };
  };

  return {
    createCart,
    addCouponCodeToCart,
  };
}
