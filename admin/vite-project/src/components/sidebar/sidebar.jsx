import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-option'>
      <NavLink to='/add' className='sidebar-options'>
      <img src={assets.add_icon} alt="" />
      <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-options'>
          <img src={assets.order_icon} alt="" />
         <p>List Item</p>
      </NavLink>
      <NavLink to='/order' className='sidebar-options'>
      <img src={assets.order_icon} alt="" />
      <p>Orders</p>
      </NavLink>
    </div>
    </div>
  )
}

export default Sidebar
