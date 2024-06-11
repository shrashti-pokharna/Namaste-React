const fetch = require("node-fetch");
exports.handler = async (event, context) => {
  const data = { hello: "Hello World" };
  const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  const response = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  });
  console.log(response);
  const data1 = await response.json();
  console.log(data1);

  return {
    statusCode: 200,
    body: JSON.stringify(data1),
  };
};
