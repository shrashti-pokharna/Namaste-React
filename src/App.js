import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Offers from "./components/Offers";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Cart from "./components/Cart";
// import UserContext from "./context/UserContext";

//Context Provider
{
  /* <UserContext.Provider value={{ loggedInUser: user }}> 
  /* </UserContext.Provider> */
}

const App = () => {
  return (
    <Provider store={appStore}>
      <div className="root">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/offers-near-me",
        element: <Offers name="Swiggy Offers" />,
      },
      {
        path: "/checkout",
        element: <Cart />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
