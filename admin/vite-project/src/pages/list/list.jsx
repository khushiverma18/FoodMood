import React, { useEffect, useState } from 'react'
import './list.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function List({url}) {
  const [List ,setList]=useState([]);

  const fetchList=async()=>{
    const response =await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    }  
  else{
toast.error("Failed to fetch the list.")
  }
}



const handleDelete = async (id) => {
  try {
    const response = await axios.post(`${url}/api/food/remove/`,{id:id});
    await fetchList();
    if (response.data.success) {
      toast.success("Item deleted successfully!");
      // Refresh the list after deletion
    } else {
      toast.error("Failed to delete item.");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    toast.error("Error deleting item.");
  }
};

useEffect(()=>{
  fetchList();
},[])
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt=''/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={() => handleDelete(item._id)}>X</p> 
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default List
