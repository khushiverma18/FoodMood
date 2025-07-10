import { createContext ,useState, useEffect} from 'react'
import axios from 'axios';
export const Storecontext = createContext()
const StorecontextProvider=(props)=> {
  const [cartitem , setCartitem]=useState({});
  const [token,setToken] = useState('')
  const[food_list,setFoodList]=useState([])

  const url='http://localhost:8080'
  
  
  const addtocart = async (itemId) => {
    if (!cartitem[itemId]) {
      setCartitem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  
    const userId = localStorage.getItem("userId"); // ✅ Get userId from localStorage
    if (token && userId) {
      try {
        await axios.post(url + "/api/cart/add", { itemId, userId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error.message);
      }
    }
  };

  const removecart = async (itemId) => {
    setCartitem((prev) => {
      if (!prev[itemId] || prev[itemId] <= 1) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
  
    const userId = localStorage.getItem("userId"); // ✅ Get userId from localStorage
    if (token && userId) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId, userId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing from cart:", error.response?.data || error.message);
      }
    }
  };
  
  

  useEffect(()=>{
console.log(cartitem);
  },[cartitem])

  const getTotalCartAmount = () => {
    return Object.keys(cartitem).reduce((total, itemId) => {
      const item = food_list.find((food) =>String(food._id) === String(itemId));
      if (item) {
        total += item.price * cartitem[itemId];
      }
      return total;
    }, 0);
  };

// ✅ Fetch Food List with Error Handling
const fetchfoodlist = async () => {
  try {
    const response = await axios.get(url + "/api/food/list");
    if (response.data && response.data.data) {
      setFoodList(response.data.data);
    } else {
      console.error("Food list response is invalid:", response.data);
    }
  } catch (error) {
    console.error("Error fetching food list:", error.response?.data || error.message);
  }
};


// ✅ Load Cart Data (Ensure userId is sent)
const loadcartdata = async (token) => {
  const userId = localStorage.getItem("userId");
  if (!userId) return; // Prevent API call if userId is missing

  try {
    const response = await axios.post(url + "/api/cart/get", { userId }, { headers: { token } });
    setCartitem(response.data.cartData);
  } catch (error) {
    console.error("Error loading cart data:", error.response?.data || error.message);
  }
};


  useEffect(() => {
    async function loadData() {
      await fetchfoodlist();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadcartdata(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  

  const contextvalue={
    food_list,
    cartitem,
    setCartitem,
    addtocart,
    removecart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  return (
    <Storecontext.Provider value={{cartitem, setCartitem, food_list, setFoodList, token, url,getTotalCartAmount,addtocart,setToken}}>
    {props.children}
    </Storecontext.Provider>
  )
}
export default StorecontextProvider;
