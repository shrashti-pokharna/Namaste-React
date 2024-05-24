import React from "react";
import { CDN_URL } from "../utils/constant";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const TopRestaurants = ({ cardData }) => {
  const title = cardData?.card?.card?.header?.title;
  const menuCards =
    cardData?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-[35px]">
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <div>
        <div className="w-full overflow-x-auto flex no-scrollbar">
          {/* grid grid-cols-4 gap-8 */}

          {menuCards?.map((res) => (
            <div className="flex-[0_0_auto] cursor-pointer mx-[15px] w-[273px]">
              {/* <Link
                key={res}
                to={`/restaurant/id`}
                className="transition-all duration-100 hover:scale-95 "
              > */}
              <RestaurantCard restaurant={res} />
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
      <hr className="border my-[24px] bg-gray-50"></hr>
    </div>
  );
};

export default TopRestaurants;
