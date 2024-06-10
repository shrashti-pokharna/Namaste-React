import { useEffect, useState } from "react";
import { MENU_URL, CORS_PROXY_URL } from "../utils/constant";

const useRestaurantMenu = (resId) => {
  const [menuData, setMenuData] = useState(null);
  const { lat, lng } = JSON.parse(localStorage.getItem("swgy_userLocation"));

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(CORS_PROXY_URL + MENU_URL(lat, lng) + resId);

    const json = await data.json();
    setMenuData(json.data);
  };

  return menuData;
};

export default useRestaurantMenu;
