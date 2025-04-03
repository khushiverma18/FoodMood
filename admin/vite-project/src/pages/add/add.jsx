import React, { useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
function Add({url}) {

  const [Image,setImage]=useState(null);
  const [Data,setData]=useState({
    name:'',
    description:'',
    price:'',
    category:'Salad'
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
const value=event.target.value;
setData(Data=>({...Data,[name]:value}))
  }

  const onSubmitHandler=async(event)=>{
event.preventDefault();
const formData=new FormData();
formData.append("name",Data.name)  
formData.append("description",Data.description)
formData.append("price",Number(Data.price))
formData.append("category",Data.category)
formData.append("image",Image)
try {
  const response = await axios.post(`${url}/api/food/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },});
  if (response.data.success) {
    setData({
      name: '',
      description: '',
      price: '',
      category: 'Salad',
    });
    setImage(null)
    toast.success(response.data.message);
  } else {
    toast.error( response.data.message);
  }
} catch (error) {
  console.error("Upload Failed:", error);
}
};


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div className='add-img flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={Image?URL.createObjectURL(Image):assets.upload_area} alt='.'></img>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' name='image' required></input>
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={Data.name} type='text' name='name' placeholder='Type here'></input>
        </div>
        <div className='add-product-dec flex-col'>
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={Data.description} name='description'  rows='6' placeholder='write content here'></textarea>
        </div>
        <div className='add-category-price'>
        <div className='add-category flex-col'>
          <p>Product category</p>
          <select onChange={onChangeHandler} value={Data.category} name='category' >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            <option value="pizza">pizza</option>
            <option value="Chinese">Chinese</option>
            <option value="Biryani">Biryani</option>
          </select>
        </div>
        <div className='add-price flex-col'>
          <p>Product description</p>
          <input onChange={onChangeHandler} value={Data.price} type='Number' name='price'  placeholder='$20'></input>
        </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
