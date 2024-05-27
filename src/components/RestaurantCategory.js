import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const RestaurantCategory = ({ data, restaurant }) => {
  const [showItems, setshowItems] = useState(true);
  const { title, itemCards, categories } = data;

  const handleShowToggle = () => setshowItems((showItems) => !showItems);

  return (
    <div className="border-b-4 ">
      <div
        className="flex justify-between font-bold cursor-pointer px-2 py-4"
        onClick={handleShowToggle}
      >
        <div>
          <span>{title}</span>
          {categories ? null : <span>({itemCards?.length})</span>}
        </div>
        {categories ? null : showItems ? (
          <PiCaretUpBold />
        ) : (
          <PiCaretDownBold />
        )}
      </div>
      {categories ? (
        <div className={`collapsible transition-[height] duration-300 h-auto `}>
          {categories?.map((category) => {
            return (
              <RestaurantCategory
                data={category}
                restaurant={restaurant}
              ></RestaurantCategory>
            );
          })}
        </div>
      ) : (
        <div
          className={`collapsible transition-[height] duration-300 ${
            showItems ? "h-[auto]" : "h-0"
          } `}
        >
          {showItems &&
            itemCards?.map((item) => (
              <CategoryItem
                key={item?.card?.info?.id}
                data={item?.card?.info}
                restaurant={restaurant}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
