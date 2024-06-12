const fetch = require("node-fetch");
exports.handler = async (event, context) => {
  const { searchQuery } = event.queryStringParameters;
  if (!searchQuery) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing search Query" }),
    };
  }
  const apiUrl = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchQuery}&types=`;
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
