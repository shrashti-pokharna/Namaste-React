import React, { useState, useRef, useEffect } from "react";
import { CDN_URL } from "../utils/constant";
import RestaurantCard, { withOffers } from "./RestaurantCard";
import { Link } from "react-router-dom";

const AllRestaurant = ({ cardData }) => {
  const [menuCards, setMenuCards] = useState(
    cardData[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  );
  const title = cardData[2]?.card?.card?.title;

  //HOC
  const RestaurantCardWithOffer = withOffers(RestaurantCard);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    json.data.cards;
    setMenuCards((menuCards) => [
      ...menuCards,
      ...json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    ]);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 mt-[35px]">
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {menuCards?.map((res) => {
          const offer = res.info.aggregatedDiscountInfoV3;
          return (
            <Link to={"/restaurant/" + res.info.id} key={res.info.id}>
              {offer === undefined ? (
                <RestaurantCard restaurant={res} />
              ) : (
                <RestaurantCardWithOffer restaurant={res} width="246px" />
              )}
            </Link>
          );
        })}
      </div>
      <div ref={observerTarget}></div>
    </>
  );
};

export default AllRestaurant;
