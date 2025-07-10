import React, { useContext, useState } from 'react';
import Loginpop from './loginpop/loginpop';
import { RxCaretDown } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../context/storecontext';
import { assets } from '../assets/assets';



export default function Header() {
  const [log,setlog]=useState(false);
    const [toggle,settoggle]=useState(false);
    const{getTotalCartAmount,token,setToken}=useContext(Storecontext);

    function show(){
    settoggle(true);
    }

    function hideshd(){
      settoggle(false);
    }

  //
  const handleSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  const navigate=useNavigate()

  const logout=()=>{
    localStorage.removeItem("token")
    setToken("");
navigate("/")
  }
  return (
    <>
     {log?<Loginpop setlog={setlog}/>:<></>}
    <div className='black-overly w-full h-full fixed duration-500' onClick={hideshd} style={{
        opacity:toggle?1:0,
        visibility:toggle?"visible":"hidden"
    }}>
        <div onClick={(e)=>{
            e.stopPropagation();
        }}
        className='w-[450px] bg-white h-full absolute duration-[400ms]' 
        style={{left:toggle? '0%':'-100%'}}>

        </div>
    </div>
      <header className='p-[15px] shadow-xl text-[#686b78] sticky top-0 bg-white z-[9999]'>
        <div className='max-w-[1200px] mx-auto  flex items-center'>
           <div className='w-[50px]'>
          <Link to='/'><img src='image/sw.webp' className='w-full' alt='mg' /> </Link>  
          </div>
            <div className=''>
               <span className='font-bold border-b-[3px] border-[black]'> Ratanda </span>Jodhpur,Rajasthan,india <RxCaretDown onClick={show} fontSize={25} className='font-bold inline  text-[#fc8019]'/>
           </div>

        <nav className='flex list-none gap-10 ml-auto mr-2 font-semibold text-[18px] cursor-pointer'>
     <Link to='/'><li onClick={()=>handleSpeech('home')}  className='hover:text-[#fc8019]'><MdHome  className='inline'/>Home</li></Link> 
          <Link to='/search'><li onClick={()=>handleSpeech('search')} className='hover:text-[#fc8019]'><IoSearch className='inline'/>
            Search</li></Link> 
            {!token ? (
              <li
                onClick={() => {
                  handleSpeech("sign in your account");
                  setlog(true);
                }}
                className="hover:text-[#fc8019] cursor-pointer flex items-center gap-1"
              >
                <IoPerson className="inline" />
                Sign in
              </li>
            ) : (
              <li className="relative group cursor-pointer">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
                 <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg hidden group-hover:block ">
    <li onClick={()=>navigate('/myorders')} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#fc8019] cursor-pointer">
      <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
      <p>Orders</p>
    </li>
    <hr className="border-t border-gray-300 my-1" />
    <li onClick={logout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#fc8019] cursor-pointer">
      <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
      <p>Logout</p>
    </li>
  </ul>
              </li>
            )}
           
       <Link to='/cart'> <li onClick={()=>handleSpeech('cart')} className='hover:text-[#fc8019]'><BsCart2 className='inline'/>Cart</li></Link>  
        </nav>
        </div>
      </header>
      </>
  )
}
