import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [menuData, setMenuData] = useState(null);
  const { lat, lng } = JSON.parse(localStorage.getItem("swgy_userLocation"));

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      `/api/fetchRestaurantMenu?lat=${lat}&lng=${lng}&resId=${resId}`
    );

    const json = await data.json();
    setMenuData(json.data);
  };

  return menuData;
};

export default useRestaurantMenu;
