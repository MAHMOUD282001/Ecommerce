import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import SingleProduct from './pages/SingleProduct/SingleProduct'
import CategoryProduct from './pages/CategoryProduct/CategoryProduct'
import Cart from './pages/Cart/Cart'
import Search from './pages/Search/Search'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          
          <Route path='/product/:id' element={<SingleProduct/>}/>
          
          <Route path='/category/:category' element={<CategoryProduct/>}/>
          
          <Route path='/cart' element={<Cart/>}/>
          
          <Route path='/search/:searchTerm' element={<Search/>}/>
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
