import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOn } from "../../store/sidebarSlice";
import { getAllCategories } from "../../store/categorySlice";
import { getAllCartItems, getCartItemsCount, getCartTotal } from "../../store/cartSlice";
import CartModel from "../CartModel/CartModel";

function Navbar() {
  
  let [show, setShow] = useState(false)
  
  let [searchTerm, setSearchTerm] = useState("")
  
  let dispatch = useDispatch();

  let categories = useSelector(getAllCategories);
  
  let cartItems = useSelector(getAllCartItems)
  
  let itemsCount = useSelector(getCartItemsCount)
  
  
  useEffect(()=>{
    dispatch(getCartTotal())
  }, [cartItems])
  
  let showCart = ()=>{
    setShow(true)
  }
  
  let hideCart = ()=>{
    setShow(false)
  }
  
  let handleSearchTerm = (e)=>{
    e.preventDefault()
    setSearchTerm(e.target.value)
  }
  
  return (
    <nav className="navbar mt-2">
      <div className="navbar-content d-flex align-items-center gap-0 gap-md-4 w-100 justify-content-between justify-content-md-center">
        <div className="brand-toggler d-flex align-items-center">
          <button
            className={`${style.togglerBtn} mx-2`}
            onClick={() => dispatch(setSidebarOn())}
          >
            <i className="fas fa-bars" />
          </button>

          <Link to="/">
            <span className={`${style.shoppingBtn} mx-3`}>
              <i className="fa-solid fa-bag-shopping"></i>
            </span>
          </Link>

          <Link to="/">
            <span className={`${style.logo}`}>
              <span>Ecom</span>merce
            </span>
          </Link>
        </div>

        <div className="w-100 d-none d-md-block">
          <div className={`${style.navbarSearch}`}>
            <div className="d-flex align-items-center h-100 w-100">
              <input type="text" placeholder="Search Here" onChange={e => handleSearchTerm(e)}/>

              <Link to={`search/${searchTerm}`} className={`${style.magifyIcon}`}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </div>
          </div>

          <ul className="d-flex align-items-center gap-3 my-2 fw-light">
            {categories?.slice(0, 5).map((category, index) => (
              <li key={index}>
                <Link to={`category/${category.slug}`} className="nav-link text-capitalize">
                  {category.Name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${style.navbarCart} d-flex align-items-center`}>
          <Link to={"/cart"} onMouseEnter={showCart} onMouseLeave={hideCart}>
              <i className="fa-solid fa-shopping-cart"></i>
              <span className="cart-value">{itemsCount}</span>                
          </Link>
          <CartModel show = {show} setShow={setShow} cartItems = {cartItems}/>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
