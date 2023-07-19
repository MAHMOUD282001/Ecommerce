import React from "react";
import style from "./Cartmodel.module.css";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/emptybag.png";

function CartModel({ cartItems, show, setShow }) {
  return (
    <div
      className={style.cartModel}
      style={{ display: show ? "block" : "none" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {cartItems?.length === 0 ? (
        <>
          <div className={style.emptyCart}>
            <img src={emptyCart} alt="Empty Cart" />
          </div>

          <Link to={"/"} className={`${style.goShopping}`} onClick={()=> setShow(false)}>
            Go Shopping Now
          </Link>
        </>
      ) : (
        <>
          <h5 className={`${style.cartModelTitle} text-center`}>
            Recently Added Products
          </h5>
          {cartItems.map((item) => (
            <Link
              to={`/product/${item?.id}`}
              key={item.id}
              className={`${style.cartItem} d-flex align-items-center justify-content-between`}
            >
              <div className={style.itemImg}>
                <img src={item?.thumbnail} alt={item.title} />
              </div>

              <div className={`${style.itemTitle} text-capitalize`}>
                {item?.title}
              </div>

              <div className={`${style.itemPrice} text-capitalize`}>
                ${item?.discountedPrice.toFixed(2)}
              </div>
            </Link>
          ))}

          <Link to={"/cart"} className={`${style.viewCart}`} onClick={()=> setShow(false)}>
            View Shopping Cart
          </Link>
        </>
      )}
    </div>
  );
}

export default CartModel;
