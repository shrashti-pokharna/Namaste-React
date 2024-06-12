const fetch = require("node-fetch");
exports.handler = async (event, context) => {
  const { lat, lng } = event.queryStringParameters;
  if (!lat || !lng) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing lat or lng parameter" }),
    };
  }
  const apiUrl = `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${lat}%2C${lng}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });
    const data1 = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data1),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.response1 ? error.response1.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
