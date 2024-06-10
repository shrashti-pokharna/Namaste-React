import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CDN_URL } from "../utils/constant";
import { BsCaretDownSquare } from "react-icons/bs";
import {
  removeItem,
  addItem,
  calculateItemTotal,
  clearCart,
} from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const totalAmount = useSelector((store) => store.cart.totalAmount);
  const selectedRestaurant = useSelector(
    (store) => store.cart.selectedRestaurant
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (item) => {
    dispatch(addItem(item));
    dispatch(calculateItemTotal());
  };

  const handleRemove = (item) => {
    if (cartItems.length === 1 && item.itemCount === 1) {
      dispatch(clearCart());
    }
    dispatch(removeItem(item));
    dispatch(calculateItemTotal());
  };

  if (!cartItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center pt-[100px] max-w-lg mx-auto h-screen">
        <div className="w-[271px] h-[256px] bg-cover mx-auto bg-no-repeat bg-[url('https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0')]"></div>
        <h2 className="text-xl font-bold mb-2 mt-10">Your cart is empty</h2>
        <p className="text-sm font-light mb-8">
          You can go to home page to view more restaurants
        </p>

        <button
          className="py-3 px-6 uppercase font-semibold text-white bg-[#fc8019]"
          onClick={() => navigate("/")}
        >
          See Restaurants near you
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#e9ecee] pt-[100px] flex justify-center min-h-screen">
      {/* <div className="w-7/12">
        <div className=" bg-white mt-8 m-10 py-5 px-10 min-h-[220px] self-start">
          Cart
        </div>
        <div className=" bg-white  m-10 py-5 px-10 min-h-[200px] self-start">
          Cart
        </div>
      </div> */}
      <div className="w-3/12 bg-white self-start min-h-max mt-8 ml-0 mr-10 pt-2  ">
        <div className="mt-6 px-8  ">
          <Link
            to={`/restaurant/${selectedRestaurant?.id}`}
            className="block max-w-max"
          >
            <div className="flex">
              <div
                className="relative w-14 h-14 mr-4 after:absolute after:content-[''] 
                                after:left-0 after:top-0 after:bottom-0 after:right-0 after:bg-blend-overlay after:bg-[#282c3f0d]"
              >
                <img
                  className="h-full"
                  src={CDN_URL + selectedRestaurant?.cloudinaryImageId}
                  alt="res-img"
                />
              </div>
              <div className="relative after:absolute after:left-0 after:bottom-0 after:content-[''] after:bg-[#282c3f] after:w-10 after:h-[3px]">
                <div className="text-[17px] font-medium text-[#282c3f]">
                  {selectedRestaurant?.name} {"    "}
                </div>
                <div className="text-[13px] text-[#686b78]">
                  {selectedRestaurant?.areaName}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className=" h-[400px] mt-6 px-8  overflow-y-auto ">
          {cartItems?.map((item) => (
            <div key={item?.id} className="flex items-center py-2.5">
              <BsCaretDownSquare
                className="mr-3.5"
                color={item?.isVeg ? "#0f8a65" : "#e43b4f"}
              />
              <div className="font-normal text-[#282c3f] text-[14px] text-ellipsis w-56 truncate">
                {item?.name}
              </div>
              <div className="flex items-center ml-4">
                <div className="flex border items-center justify-center w-[70px] text-sm h-8 border-[#d4d5d9]">
                  <span
                    className="block text-center font-medium w-1/3 text-base cursor-pointer text-[#9a9ca3]"
                    onClick={() => handleRemove(item)}
                  >
                    -
                  </span>
                  <span className="block text-center font-medium w-1/3 text-[#60b246] ">
                    {item?.itemCount}
                  </span>
                  <span
                    className="block text-center font-medium w-1/3 text-[#60b246] cursor-pointer text-base"
                    onClick={() => handleAdd(item)}
                  >
                    +
                  </span>
                </div>
                <div className="ml-5 text-[13px] text-[#606375] text-right w-[60px]">
                  ₹
                  {parseFloat(
                    (
                      item?.itemCount *
                      ((item?.defaultPrice || item?.price) / 100)
                    ).toFixed(2)
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="pb-5 border-b-2 border-[#282c3f]">
            <div className="text-[#282c3f] font-medium">Bill Details</div>
            <div className="flex items-center text-[13px] font-light my-2.5">
              <div className="">Item Total</div>
              <div className="flex-1 text-right">₹{totalAmount}</div>
            </div>
            <div className="flex items-center text-[13px] font-light my-2.5">
              <div className="">Delivery partner fee</div>
              <div className="flex-1 text-right">₹{19}</div>
            </div>
            <hr className="my-5 block" />
            <div className="flex items-center text-[13px] font-light my-2.5">
              <div className="">Platform fee</div>
              <div className="flex-1 text-right">₹{2}</div>
            </div>
            <div className="flex items-center text-[13px] font-light my-2.5">
              <div className="">GST & Restaurant Charges</div>
              <div className="flex-1 text-right">₹{32}</div>
            </div>
          </div>
        </div>
        <div className="px-8 h-[50px] flex justify-between  items-center pt-6 text-[#282c3f] font-semibold py-8">
          <div className="uppercase">To Pay</div>
          <div className="">₹{totalAmount + 53}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
