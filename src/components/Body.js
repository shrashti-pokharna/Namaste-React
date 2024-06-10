import React, { useEffect, useState } from "react";
import FoodCategories from "./FoodCategories";
import { useEffect, useState } from "react";
import TopRestaurants from "./TopRestaurants";
import AllRestaurant from "./AllRestaurant";
import Shimmer from "./Shimmer";
import { CORS_PROXY_URL } from "../utils/constant";

const Body = () => {
  const [listAllCards, setListAllCards] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const { lat, lng } = JSON.parse(localStorage.getItem("swgy_userLocation"));

  const fetchData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();
    setListAllCards(json.data.cards);
  };

  if (listAllCards?.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="max-w-[1080px] mx-auto pt-[80px] pb-48">
      <FoodCategories cardData={listAllCards[0]} />
      <TopRestaurants cardData={listAllCards[1]} />
      <AllRestaurant cardData={listAllCards} />
    </div>
  );
};

export default Body;
