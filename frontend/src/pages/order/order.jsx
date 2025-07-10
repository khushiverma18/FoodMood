import React, { useContext, useState} from "react";
import { Storecontext } from "../../context/storecontext";
import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  const { getTotalCartAmount, token, food_list, cartitem, url } = useContext(Storecontext);
  //const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!cartitem) {
        console.error("cartItems is undefined!");
        return;
    }

    let orderItems = [];

    food_list.forEach((item) => {
        if (item?._id && cartitem?.[item._id] > 0) {
            orderItems.push({
                ...item,
                quantity: cartitem[item._id],
            });
        }
    });

  let orderData ={
address:data,
items:orderItems,
amount:getTotalCartAmount()+2,
  }
  let response =await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url)
  }
  else{
    console.error("Order API Error:", response.data);
    alert("Error: " + response.data.message || "Something went wrong!");
  }
  console.log("Order Data being sent:", orderData);
};


console.log("Cart Items before placing order:", cartitem);
console.log("Food List:", food_list);



  return (
    <div>
     <Header/>
      <form
        onSubmit={placeOrder}
        className="h-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-12"
      >
        {/* Left Section: Delivery Information */}
        <div className="place-order-left bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" className="input required-field" />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" className="input required-field" />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" className="input required-field mt-4" />
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" className="input required-field mt-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" className="input required-field" />
            <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" className="input required-field" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" className="input required-field" />
            <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" className="input required-field" />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" className="input required-field mt-4" />
        </div>

        {/* Right Section: Cart Totals */}
        <div className="place-order-right bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Cart Totals</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Delivery Fee</p>
              <p className="font-medium">${2}</p>
            </div>
            <hr />
            <div className="flex justify-between items-center font-semibold">
              <p>Total</p>
              <p>${getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type="submit" onClick={placeOrder} className="w-full bg-[#fc8019] text-white py-2 mt-4 rounded-lg hover:bg-[#686b78] transition duration-300">
            PROCEED TO PAYMENT
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
