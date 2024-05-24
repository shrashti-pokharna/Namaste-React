import React from "react";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ restaurant }) => {
  let discountInfo = "";
  return (
    <div className="p-0 text-sm h-full ">
      <div className="relative mb-2">
        <img
          className="rounded-2xl object-cover h-[182px]"
          width="273"
          height="182"
          src={CDN_URL + restaurant.info.cloudinaryImageId}
          alt="res-img"
          key={restaurant.imageId}
        ></img>
        <div
          className="absolute bottom-0 left-0 right-0 h-[81px] text-left grid content-end px-3 pb-2 
                    bg-gradient-to-b from-[#1b1e2400] to-[#1b1e24] rounded-2xl"
        >
          <div className="font-bold text-[21px] w-auto whitespace-nowrap text-[#ffffffeb]">
            {discountInfo}
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg truncate overflow-hidden whitespace-nowrap">
          {restaurant.info.name}
        </h3>
        <div className="flex text-base">
          <span className=" text-base">
            {restaurant.info.avgRatingString} •{" "}
          </span>
          {restaurant.info.sla.slaString}
        </div>

        <div className="truncate overflow-hidden whitespace-nowrap text-base text-[#2060c99]">
          {restaurant?.info?.cuisines.join(",")}
        </div>
        <div className="truncate overflow-hidden whitespace-nowrap text-base text-[#2060c99]">
          {restaurant.info.locality}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
