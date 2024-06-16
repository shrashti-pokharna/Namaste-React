import { useParams, Link } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import SearchShimmer from "./SearchShimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const menuData = useRestaurantMenu(resId);
  const cartItems = useSelector((store) => store.cart.items);

  if (menuData === null) return <SearchShimmer />;
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
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
          category?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        )
          return category;
      }
    );

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

      {categories?.map((category, index) => {
        return (
          <RestaurantCategory
            key={index}
            data={category?.card?.card}
            restaurant={menuData?.cards[2]?.card?.card?.info}
          />
        );
      })}
      {/* <ScrollToTop /> */}
      {cartItems && cartItems.length > 0 && (
        <div className="fixed flex h-12 bottom-0 text-white justify-between bg-[#60b246]  py-2 px-4 items-center min-w-[800px]">
          <div className="text-sm font-medium">
            {cartItems?.length} items added
          </div>
          <Link
            to="/checkout"
            className="flex items-center uppercase text-sm font-semibold"
          >
            <span className="mr-2">View Cart</span>
            <FiShoppingBag size={15} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
