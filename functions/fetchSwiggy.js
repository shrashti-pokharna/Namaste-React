const axios = require("axios");

exports.handler = async function (event, context) {
  const { lat, lng } = event.queryStringParameters;
  if (!lat || !lng) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing lat or lng parameter" }),
    };
  }

  const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const response = await axios.get(apiUrl);
    console.log("response in fetchswiggy", response);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
