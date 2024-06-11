const axios = require("axios");

exports.handler = async function (event, context) {
  console.log("in functions");
  const { lat, lng } = event.queryStringParameters;
  console.log("lat and lng", lat, lng);
  if (!lat || !lng) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing lat or lng parameter" }),
    };
  }

  const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  console.log("apiUrl", apiUrl);

  try {
    const response = await axios.get(apiUrl);
    console.log("response in fetchswiggy", response);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type", // Allow the Content-Type header
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
