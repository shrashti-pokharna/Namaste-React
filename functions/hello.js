const fetch = require("node-fetch");
exports.handler = async (event, context) => {
  const data = { hello: "Hello World" };
  const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  const response = await fetch(apiUrl);
  console.log(response);
  const data1 = await response.json();
  console.log(data1);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
