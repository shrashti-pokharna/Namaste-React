import React, { useEffect, useLayoutEffect, useState } from "react";
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
import Search from "./components/Search";
import Support from "./components/Support";
// import UserContext from "./context/UserContext";

//Context Provider
{
  /* <UserContext.Provider value={{ loggedInUser: user }}> 
  /* </UserContext.Provider> */
}

const App = () => {
  const [success, setSuccess] = useState(
    localStorage.getItem("swgy_userLocation")
  );
  if (!localStorage.getItem("swgy_userLocation")) {
    const userLocation = {
      placeId: "ChIJbU60yXAWrjsR4E9-UejD3_g",
      address: "Bengaluru, Karnataka, India",
      lat: 12.9715987,
      lng: 77.5945627,
    };
    localStorage.setItem("swgy_userLocation", JSON.stringify(userLocation));
    setSuccess(localStorage.getItem("swgy_userLocation"));
  }

  if (!success) return null;
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
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/support",
        element: <Support />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
