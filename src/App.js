import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Offers from "./components/Offers";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
// import UserContext from "./context/UserContext";

//Context Provider
{
  /* <UserContext.Provider value={{ loggedInUser: user }}> 
  /* </UserContext.Provider> */
}

const App = () => {
  return (
    <div className="root">
      <Header />

      <Outlet />
    </div>
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
        path: "/offers",
        element: <Offers name="Swiggy Offers" />,
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
