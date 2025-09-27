import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import Add from './pages/add/add'
import List from './pages/list/list'
import Order from './pages/order/order'
import {Route,Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
const url="https://foodmoodbackend.onrender.com"
  return (
  <div>
    <ToastContainer/>
    <Navbar/>
    <hr/>
    <div className='app-content'>
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add url={url}/>}></Route>
        <Route path='/list' element={<List url={url}/>}></Route>
        <Route path='/order' element={<Order url={url}/>}></Route>
      </Routes>
    </div>
  </div>
  )
}

export default App
