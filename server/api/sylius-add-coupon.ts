export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();

    const { language, country, tokenValue, couponCode } = getQuery(event);

    const { Authorization } = getHeaders(event);

    if (
      typeof country !== "string" ||
      typeof language !== "string" ||
      typeof couponCode !== "string"
    ) {
      return new Response(
        "Invalid request, country, language, and/or couponCode is not provided",
        {
          status: 400,
          headers: {
            "Netlify-CDN-Cache-Control": "public, max-age=0, must-revalidate",
          },
        }
      );
    }

    if (!tokenValue) {
      return new Response("Invalid request, tokenValue is not provided", {
        status: 400,
        headers: {
          "Netlify-CDN-Cache-Control": "public, max-age=0, must-revalidate",
        },
      });
    }

    const request = await fetch(
      `https://dokteronline.commerce.sbtest.nl/api/shop/carts/${tokenValue}/coupon`,
      {
        method: "POST",
        headers: {
          "Sylius-Channel-Code": `dok_${country.toLowerCase()}`,
          "Accept-Language": language,
          "Content-Type": "application/json",
          Authorization: Authorization ?? "",
        },
        body: JSON.stringify({
          couponCode,
        }),
      }
    );

    const data = await request.json();
    return Response.json(data, { status: request.status });
  } catch (error) {
    return error;
  }
});
