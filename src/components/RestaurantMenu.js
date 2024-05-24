import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const menuData = useRestaurantMenu(resId);

  if (menuData === null) return null;
  const { text } = menuData?.cards[0]?.card?.card;
  const {
    cuisines,
    areaName,
    city,
    avgRatingString,
    totalRatingsString,
    sla,
    costForTwoMessage,
  } = menuData?.cards[2]?.card?.card?.info;

  const categories =
    menuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category) => {
        if (
          category?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
          return category;
      }
    );
  console.log(menuData);
  return (
    <div className="max-w-[800px] min-h-[800px] mx-auto pt-[120px] pb-[100px]">
      <div className="flex ">
        <div className="flex-1">
          <h2 className="font-bold text-[1.33rem] text-[#282c3f] mb-2">
            {text}
          </h2>
          <p className="text-[0.83rem] text-[#7e808c] mb-1">
            {cuisines.join(" ,")}
          </p>
          <p className="text-[0.83rem] text-[#7e808c]">
            {areaName}, {city}
          </p>
        </div>
        <div className="p-2 font-bold self-start border max-w-[100px] rounded-md text-green-600">
          <div className="flex items-center justify-center mb-2 pb-2.5 border-b-[1px] border-[#e9e9eb]">
            {/* <IoMdStar size={21} /> */}
            <span className="ml-0.5 text-[13px] font-bold">
              {avgRatingString}
            </span>
          </div>
          <div className="font-semibold text-[10px] text-[#8b8d97]">
            {totalRatingsString}
          </div>
        </div>
      </div>

      <hr className="border-dashed my-5" />

      <div className="flex justify-start">
        <span className="mr-7 font-bold text-sm flex items-center">
          {/* <FaClock className="mr-2" size={20} /> */}
          <span>{sla?.deliveryTime} MINS</span>
        </span>
        <span className="font-bold text-sm">{costForTwoMessage}</span>
      </div>

      <hr className="my-6 border-t-8" />

      {categories?.map((category, index) => (
        <RestaurantCategory
          key={index}
          data={category?.card?.card}
          restaurant={menuData?.cards[2]?.card?.card?.info}
        />
      ))}
      {/* <ScrollToTop /> */}
    </div>
  );
};

export default RestaurantMenu;
