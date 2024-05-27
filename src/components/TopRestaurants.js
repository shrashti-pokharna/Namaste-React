import React from "react";
import { CDN_URL } from "../utils/constant";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { withOffers } from "./RestaurantCard";

const TopRestaurants = ({ cardData }) => {
  const title = cardData?.card?.card?.header?.title;
  const menuCards =
    cardData?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  const RestaurantCardWithOffer = withOffers(RestaurantCard);
  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-[35px]">
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <div>
        <div className="w-full overflow-x-auto flex no-scrollbar">
          {menuCards?.map((res) => {
            const offer = res.info.aggregatedDiscountInfoV3;
            return (
              <Link
                key={res.info.id}
                to={"/restaurant/" + res.info.id}
                className="transition-all duration-100 hover:scale-95 "
              >
                <div className="flex-[0_0_auto] cursor-pointer mx-[15px] w-[273px]">
                  {offer === undefined ? (
                    <RestaurantCard restaurant={res} />
                  ) : (
                    <RestaurantCardWithOffer restaurant={res} width="273px" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <hr className="border my-[24px] bg-gray-50"></hr>
    </div>
  );
};

export default TopRestaurants;
