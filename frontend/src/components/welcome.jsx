import React, { useState, useEffect } from 'react';
import './welcome.css'
import { wlist } from "../assets/assets"

const WelcomePage = () => {
  const [flip, setFlip] = useState(false);

  // Hide the message and redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
    // navigate('/home');
    }, 7000);

    return () => clearTimeout(timer);
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true); // Start flip animation
      setTimeout(() => {
        setFlip(false); // Reset flip animation
      }, 500); // Delay for smooth transition
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="wel">
    <div className="grid-container ">
      {wlist.map((item, index) => (
        <div key={index} className={ `grid-item item-${index + 1}`}>
         <div className='flip-inner'> <img src={item.w} alt="." className="w-full h-full img" /></div>
        </div>
      ))}
    </div>
  </div>
      );
    };
export default WelcomePage;











