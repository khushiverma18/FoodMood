import React from 'react';
import './Footer.css'
import { assets } from '../assets/assets';
export default function Footer() {
  return (
    <footer>
<div className='footer' id='footer'>
  <div className='footer-content'>
    <div className='footer-content-left'>
      <h2>FoodMood</h2>
      <p></p>
<div className='footer-social-icons'>
  <img src={assets.facebook_icon} alt=''/>
  <img src={assets.twitter_icon} alt=''/>
  <img src={assets.linkedin_icon} alt=''/>
</div>
    </div>
    <div className='footer-content-center'>
<h2>COMPANY</h2>
<li>Home</li>
<li>About us</li>
<li>Delivery</li>
<li>Privacy policy</li>
    </div>
    <div className='footer-content-right'>
      <h2>GET IN TOUCH</h2>
      <ul>
        <li>+1-212-456-7890</li>
        <li>contact@FoodMood.com</li>
      </ul>
    </div>
  </div>
<hr></hr>
<p className='footer-copy'> Copyright 2025 ~ FoodMood.com-All Right Reserved </p>
</div>
    </footer>
  );
}
