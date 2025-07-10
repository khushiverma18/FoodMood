import React, { useContext } from 'react';
import { Storecontext } from '../../context/storecontext';
import './cart.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartitem, food_list, removecart,getTotalCartAmount,url  } = useContext(Storecontext);
const navigate=useNavigate();
  return (
    <div>
      <Header />
      <div className='cart'>
        <div className='cart-items'>
          <div className='cart-items-title'>
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartitem[item._id] > 0) {
              return (
                <div key={index}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={url+"/images/"+item.image} alt='.' />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartitem[item._id]}</p>
                    <p>${item.price * cartitem[item._id]}</p>
                    <p className='cross' onClick={() => removecart(item._id)}>X</p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className='cart-bottom'>
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>{getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>{ console.log("Navigating to Order, Cart Items:", cartitem);navigate('/order')}}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
</div>
      <Footer /> 
    </div>
  );
}
