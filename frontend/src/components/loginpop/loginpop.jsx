import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import './loginpop.css'
import { useContext } from 'react';
import axios from 'axios';
import { Storecontext } from '../../context/storecontext';

export default function Loginpop({setlog}) {
    const {url,setToken} =useContext(Storecontext);
    const[curr,setcurr]=useState("Login")
    const[data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = `${url}/api/user/${curr === 'Login' ? 'login' : 'register'}`;
    
      try {
        console.log("Sending request to:", newUrl, "with data:", data);
        const response = await axios.post(newUrl, data);
    
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user._id); // ✅ Store userId
          setlog(false);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again.");
      
        if (error.response) {
          console.error("Server responded with:", error.response.data);
          alert(error.response.data.message || "Login failed. Please try again.");
        } else if (error.request) {
          console.error("No response received from server.");
          alert("No response from server. Check backend.");
        } else {
          console.error("Request error:", error.message);
          alert("Something went wrong. Please try again.");
        }
      }
    };
    
    
  return (
    <div className='loging-popup'>
        <form onSubmit={onLogin} className="container">
            <div className='title'>
               <b><h1 className='hh'>{curr}</h1></b>
                <span className='close' onClick={()=>setlog(false)}><b><IoClose /></b></span>
            </div>
         <div className='inputs'>
            {curr==="Login"?<></>:
            <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required/>
         </div>
         <button type='submit'>{curr==="Sign Up"?"Create account":"Login"}</button>
         <div className='condition'>
            <input type='checkbox' required/>
            <p>By continuing,i agree to the terms of use & privacy policy.</p>
         </div>
         {curr==="Login"?
         <p className='pp'>Create a new  account?<span onClick={()=>setcurr("Sign Up")}>Click here</span></p>
        : <p className='pp'>Already have an account?<span onClick={()=>setcurr("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}
