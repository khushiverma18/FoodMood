import React from "react";
import { MdStars } from "react-icons/md";

export default function Card(props) {
  return (
    <div className='w-full md:w-[273px] shrink-0 mb-3'>
      <div className='group h-[182px] rounded-[15px] overflow-hidden relative'>
        <img className='group-hover:scale-110 duration-150 object-cover w-full h-full' src={'http://localhost:8080/images/'+props.image} alt='..'></img>
        <div className='image-overley absolute w-full h-full top-0 flex items-end p-2 text-[16px] md:text-[25px] 
        font-blod text-white tracking-tighter'>
            {props.offer}
        </div>
      </div>
       <div className="mt-3 text-md md:text-xl font-bold">{props.title}</div>
    <div><MdStars className="inline" />
    {props.rating}
        <span className="ml-2">{props.minTime}-{props.maxTime}mins</span>
    </div>
<div className="text-slate-700">{props.name}<br></br>{props.place}</div>
    </div>
  )
}
