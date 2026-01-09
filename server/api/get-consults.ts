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
            "Cache-Control":
              "public, s-maxage=300, stale-while-revalidate=604800",
          },
        }
      );
    }

    const urlParameters = new URLSearchParams({
      filterByProductAttributeType: "consult",
      itemsPerPage: "100",
    });

    const request = await fetch(
      `https://commerce.dokteronline.com/api/shop/products?${urlParameters}`,
      {
        headers: {
          "Sylius-Channel-Code": `dok_${country.toLowerCase()}`,
          "Accept-Language": language,
        },
      }
    );

    const data = await request.json();

    return Response.json({
      henk: "frietjes",
      frietjes: "henk",
    });
  } catch (error) {
    return error;
  }
});
