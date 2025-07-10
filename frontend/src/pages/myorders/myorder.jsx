import React, { useContext, useEffect, useState } from "react";
import "./myorder.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Storecontext } from "../../context/storecontext";
import axios from "axios";
import { assets } from "../../assets/assets";


const Myorder = () => {
  const { url, token } = useContext(Storecontext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  const handleTrackOrder = () => {
    setTimeout(() => {
      fetchOrder();
    }, 500);
  };

  return (
    <div>
      <Header />
      <div className="my-orders">
        <h2 className="myordersp">My Orders</h2>
        <div className="container">
          {data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets?.parcel_icon || "fallback-image-url"} alt="Parcel Icon" />
              <p>
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} X ${item.quantity}`
                    : `${item.name} X ${item.quantity}, `
                )}
              </p>
              <p>₹ {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={handleTrackOrder}>Track Order</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Myorder;
