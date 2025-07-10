import React, {useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Toprestlist from '../../components/toprestlist';
import { Storecontext } from '../../context/storecontext';



function Search() {
  const { food_list } = useContext(Storecontext);
    const [filteredProducts, setFilteredProducts] = useState(food_list);
    const [searchVal, setSearchVal] = useState("");
            //
            const handleSearchClick = () => {
              if (searchVal === "") {
                setFilteredProducts(food_list); // Reset to original list if search is empty
                return;
              }
              const filtered = food_list.filter((item) =>
                item.name.toLowerCase().includes(searchVal.toLowerCase()) // Case-insensitive search
              );
              setFilteredProducts(filtered);
            };

            // Handle 'All Menu' button click
  const handleAllMenuClick = () => {
    setFilteredProducts(food_list); // Reset to the full list
    setSearchVal(""); // Optionally clear the search input
  };

    return (
        <div>
            <Header/>
            <div className="relative flex items-center space-x-4 bg-white p-4 shadow-lg rounded-lg mx-auto w-1/2">
            <BsSearch className=" top-2.5 left-3 h-6 w-6 text-[#fc8019]" />
                <input className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => setSearchVal(e.target.value)} icon='search' value={searchVal}
                placeholder='Search...' ></input>
                <button className='bg-[#fc8019] px-6 py-3 mx-px-8 text-white font-semibold rounded-lg shadow-md hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      ' onClick={handleSearchClick}>Search</button>
            </div>
           <div  className='max-w-[1200px] mx-auto px-2 pb-11'>
                   <div className='flex my-3 items-center justify-between'>
                     <div className='text-[25px] font-bold cursor-pointer' onClick={handleAllMenuClick}>All Menu</div>
                     </div>
                     <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                      {filteredProducts.map((d, index) => {
                               
                                 return  <Toprestlist
                                     key={d._id || index}
                                     id={d._id}
                                     name={d.name}
                                     description={d.description}
                                     price={d.price}
                                     image={d.image}
                                   />
                               
                              })}
                   </div>
                   </div>
                   <Footer/>
        </div>
    );
}

export default Search;