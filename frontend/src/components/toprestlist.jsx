import React, { useContext } from "react"
import { assets } from "../assets/assets"
import "./Toprest.css";
import { Storecontext } from "../context/storecontext";
export default function Toprestlist({id,name,price,description,image})  {
 
  const{cartitem,addtocart,removecart,url}=useContext(Storecontext);
  
  return (
      <div className="food-item">
        <div className="food-item-img">
            <img className="food-item-image" src={url+"/images/"+image} alt=".."/>
{!cartitem[id]
?<img className="add" onClick={()=>addtocart(id)} src={assets.add_icon_white} alt=""/>
:<div className="food-item-counter">
       <img onClick={()=>removecart(id)} src={assets.remove_icon_red} alt=""></img>
       <p>{cartitem[id]}</p>
       <img onClick={()=>addtocart(id)} src={assets.add_icon_green} alt=""></img>
       </div>} </div>
        <div className="food-item-info">
<div className="food-item-name">
    <p>{name}</p>
    <img src={assets.rating_starts} alt="."/>
</div>
<p className="food-item-desc">{description}</p>
<p className="food-item-price">${price}</p>
        </div>
      </div>
    )
  }

