import React from "react";
import { CDN_URL } from "../utils/constant";

const FoodCategories = ({ cardData }) => {
  const title = cardData?.card?.card?.header?.title;
  const menuCards = cardData?.card?.card?.imageGridCards?.info;
  return (
    <div className="h-[256px]">
      <h1 className="font-bold text-2xl mb-2">{title}</h1>

      <div className="w-full overflow-x-auto flex no-scrollbar">
        {menuCards?.map((res) => {
          // console.log(res);
          return (
            <div
              key={res.imageId}
              className="flex-[0_0_auto] cursor-pointer h-[180px] w-[144px] mx-[12px]"
            >
              <img
                src={CDN_URL + res.imageId}
                width="144"
                height="180"
                className="object-cover last:pr-0"
              ></img>
            </div>
          );
        })}
      </div>
      <hr className="border my-[24px] bg-gray-50"></hr>
    </div>
  );
};

export default FoodCategories;
