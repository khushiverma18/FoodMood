import React, { useContext} from 'react';
import "./Toprest.css";
import { Storecontext } from "../context/storecontext";
import Toprestlist from "./toprestlist";


export default function Toprest({ category }) {
  const { food_list } = useContext(Storecontext);

  if (!food_list || food_list.length === 0) {
    return <p>Loading restaurants...</p>;
  }

  return (
    <div className="food-display" id='food-display'>
      <h2>Top restaurant chains in Modinager</h2>
      <div className="food-display-list">
        {food_list.map((d, index) => {
          {console.log(category,d.category);}
          if(category==="All"||category===d.category){
            return  <Toprestlist
                key={d._id || index}
                id={d._id}
                name={d.name}
                description={d.description}
                price={d.price}
                image={d.image}
              />
          }
})}
      </div>
      <hr className="my-6 border-[2px]" />
    </div>
  );
}


