export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();

    const { language, country, affiliateId, localeCode } = getQuery(event);
    const { Authorization } = getHeaders(event);

    if (typeof country !== "string" || typeof language !== "string") {
      return new Response(
        "Invalid request, country and/or language is not provided",
        {
          status: 400,
          headers: {
            "Netlify-CDN-Cache-Control": "public, max-age=0, must-revalidate",
          },
        }
      );
    }

    const request = await fetch(
      `https://dokteronline.commerce.sbtest.nl/api/shop/carts`,
      {
        method: "POST",
        body: JSON.stringify({
          affiliateId,
          localeCode: localeCode,
        }),
        headers: {
          "Sylius-Channel-Code": `dok_${country.toLowerCase()}`,
          "Accept-Language": language,
          "Content-Type": "application/json",
          Authorization: Authorization ?? "",
        },
      }
    );

    const data = await request.json();

    setResponseStatus(event, request.status);
    return Response.json(data);
  } catch (error) {
    return error;
  }
});
