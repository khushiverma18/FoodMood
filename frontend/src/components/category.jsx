import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import React, { useState } from 'react';
import { menu_list } from "../assets/assets";

export default function Category({category,setcategory}){
  const[slide,setslide]=useState(0);
  
  //
 const preslide=()=>{
  if(slide===0)return false;
setslide(slide-3);
 }
 const nextslide=()=>{
  if(slide+5>=menu_list.length) return false;
setslide(slide+3);
 }

    return (
        <div className='max-w-[1200px] mx-auto px-2'>
      <div className='flex my-3 items-center justify-between'>
        <div className='text-[25px] font-bold'>What's on your mind?</div>
        <div className='flex'>
            <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2'onClick={preslide}><FaArrowLeftLong/></div>
            <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2'onClick={nextslide}><FaArrowRight/></div>
        </div>
      </div>
      <div className='flex overflow-hidden'>
        {
          menu_list.map(
            (item,index)=>{
              return(
              <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} style={{
                transform:`translateX(-${slide*100}%)`
              }} key={index} className="w-[150px] shrink-0 duration-500">
              <img src={item.menu_image} alt="."/>
              <p className="invisible">{item.menu_name}</p>
              </div>
              )
            }
          )
        }
      </div>
      <hr className="my-6 border-[2px]"></hr>
      </div>
    )
  }
