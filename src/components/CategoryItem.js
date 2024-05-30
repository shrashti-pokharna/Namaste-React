import React, { useRef, useState } from "react";
import { BsCaretDownSquare, BsDisplay } from "react-icons/bs";
import { CDN_URL } from "../utils/constant";
import useTruncatedElement from "../hooks/useTruncatedElement";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setRestaurant, calculateItemTotal } from "../store/cartSlice";
import Modal from "./Modal";
const CategoryItem = ({ data, restaurant }) => {
  const [showModal, setShowModal] = useState(false);
  const { name, price, defaultPrice, description, imageId, isVeg } = data;
  const ref = useRef(null);
  const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
    ref,
  });

  const dispatch = useDispatch();
  const selectedRestaurant = useSelector(
    (store) => store.cart.selectedRestaurant
  );

  const handleAddItem = () => {
    if (selectedRestaurant && selectedRestaurant?.id !== restaurant?.id) {
      setShowModal(true);
    } else if (
      selectedRestaurant &&
      selectedRestaurant?.id === restaurant?.id
    ) {
      dispatch(addItem(data));
      dispatch(calculateItemTotal());
    } else {
      dispatch(setRestaurant(restaurant));
      dispatch(addItem(data));
      dispatch(calculateItemTotal());
    }
  };

  return (
    <div className="flex justify-between min-h-[102px] px-2 pt-1 pb-4 my-1 border-b-2 last:border-b-0">
      <div>
        <BsCaretDownSquare
          className="my-2"
          color={isVeg ? "#0f8a65" : "#e43b4f"}
        />
        <h3 className="font-medium text-md text-[#3e4152]">{name}</h3>
        <span className="text-sm text-[#3e4152]">
          ₹{parseFloat(((price || defaultPrice) / 100).toFixed(2))}
        </span>
        <p
          ref={ref}
          className={`mt-3 text-sm text-[#282c3f73] max-w-[600px] ${
            !isReadingMore && "line-clamp-2"
          }`}
        >
          {description}
        </p>

        {isTruncated && !isReadingMore && (
          <span
            className="cursor-pointer"
            onClick={() => setIsReadingMore(true)}
          >
            more
          </span>
        )}
      </div>
      <div className="relative w-28  py-5">
        {imageId && (
          <img
            className="rounded-md"
            src={`${CDN_URL}${imageId}`}
            alt="item-img"
          />
        )}
        <button
          className="p-1 w-16 rounded left-6 font-medium bottom-2 bg-white
                    absolute border text-sm text-green-600 shadow drop-shadow-[0_3px_8px_#e9e9e2]"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CategoryItem;
