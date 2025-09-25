import React, { useContext } from "react";
import { assets } from "../assets/assets";
import "./Toprest.css";
import { Storecontext } from "../context/storecontext";

export default function Toprestlist({ id, name, price, description, image }) {
  const { cartitem, addtocart, removecart, url } = useContext(Storecontext);

  // Safe defaults
  const safeId = id || "temp-id";
  const safeName = name || "Unnamed";
  const safePrice = price || 0;
  const safeDesc = description || "No description available";
  const safeImage = image || "placeholder.png";

  return (
    <div className="food-item">
      <div className="food-item-img">
        <img
          className="food-item-image"
          src={`${url}/images/${safeImage}`}
          alt={safeName}
        />
        {!cartitem?.[safeId] ? (
          <img
            className="add"
            onClick={() => addtocart(safeId)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removecart(safeId)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartitem[safeId]}</p>
            <img
              onClick={() => addtocart(safeId)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
          <p>{safeName}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{safeDesc}</p>
        <p className="food-item-price">${safePrice}</p>
      </div>
    </div>
  );
}
