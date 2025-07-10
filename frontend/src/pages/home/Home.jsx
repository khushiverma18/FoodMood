import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header';
import Footer from '../../components/footer';
import Home from '../../components/home';
import Toprest from '../../components/Toprest';
import Category from '../../components/category';
import Appdow from '../../components/Appdow';

const Homee = () => {
  const [category,setcategory]=useState("All")
  return (
    <div>
      <Header/>
      <Home/>
<Category category={category} setcategory={setcategory}/>
<Toprest category={category}/>
<Appdow/>
      <Footer/>
    </div>
  )
}

export default Homee
