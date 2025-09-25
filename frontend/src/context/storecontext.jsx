import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Storecontext = createContext();

const StorecontextProvider = (props) => {
  const [cartitem, setCartitem] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = "http://localhost:8080";

  // ✅ Add to Cart - Crash Proof
  const addtocart = async (itemId) => {
    if (!itemId) return; // Prevent crash if itemId is undefined

    setCartitem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    const userId = localStorage.getItem("userId");
    if (token && userId) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId, userId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error.message);
      }
    }
  };

  // ✅ Remove from Cart - Crash Proof
  const removecart = async (itemId) => {
    if (!itemId) return; // Prevent crash

    setCartitem((prev) => {
      if (!prev[itemId] || prev[itemId] <= 1) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });

    const userId = localStorage.getItem("userId");
    if (token && userId) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId, userId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error.response?.data || error.message);
      }
    }
  };

  // ✅ Calculate total cart amount
  const getTotalCartAmount = () => {
    return Object.keys(cartitem).reduce((total, itemId) => {
      const item = food_list.find((food) => String(food._id) === String(itemId));
      if (item) {
        total += item.price * cartitem[itemId];
      }
      return total;
    }, 0);
  };

  // ✅ Fetch Food List
  const fetchfoodlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data && response.data.data) {
        setFoodList(response.data.data);
      } else {
        console.error("Food list response invalid:", response.data);
      }
    } catch (error) {
      console.error("Error fetching food list:", error.response?.data || error.message);
    }
  };

  // ✅ Load Cart Data
  const loadcartdata = async (token) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        { userId },
        { headers: { token } }
      );
      setCartitem(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error.response?.data || error.message);
    }
  };

  // ✅ Load food list and cart on mount
  useEffect(() => {
    async function loadData() {
      await fetchfoodlist();

      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadcartdata(localToken);
      }
    }
    loadData();
  }, []);

  const contextvalue = {
    food_list,
    cartitem,
    setCartitem,
    addtocart,
    removecart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <Storecontext.Provider value={contextvalue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
