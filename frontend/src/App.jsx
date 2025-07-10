import './App.css';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/cart/cart';
import Homee from './pages/home/Home';
import Search from './pages/search/search';
import Order from './pages/order/order';
import WelcomePage from './components/welcome';
import Verify from './pages/verify/verify';
import Myorder from './pages/myorders/myorder';
import StorecontextProvider, { StoreProvider } from './context/storecontext'; 


function App() {
  return (
    <StorecontextProvider>
   <div>
  <Routes>
  <Route path='/w' element={<WelcomePage/>}> </Route>
  <Route path='/' element={<Homee/>}> </Route>
    <Route path='/cart' element={<Cart/>}> </Route>
    <Route path='/search' element={<Search/>}></Route>
    <Route path='/order' element={<Order/>}></Route>
    <Route path='/verify' element={<Verify/>}></Route>
 <Route path='/myorders' element={<Myorder/>}></Route>
  </Routes>
   </div>
   </StorecontextProvider>
  );
}

export default App;
