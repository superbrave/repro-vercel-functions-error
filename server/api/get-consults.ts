export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();

    const { language, country } = getQuery(event);

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

    const urlParameters = new URLSearchParams({
      filterByProductAttributeType: "consult",
      itemsPerPage: "100",
    });

    const request = await fetch(
      `${config.SYLIUS_BASE}/api/shop/products?${urlParameters}`,
      {
        headers: {
          "Sylius-Channel-Code": `dok_${country.toLowerCase()}`,
          "Accept-Language": language,
        },
      }
    );

    return await request.json();
  } catch (error) {
    return error;
  }
});
