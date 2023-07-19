import React from "react";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/emptybag.png";
import {
  clearCart,
  getAllCartItems,
  getCartItemsCount,
  removeFromCart,
  toggleCartQty,
} from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  let dispatch = useDispatch();

  let cartItems = useSelector(getAllCartItems);

  let { itemsCount, totalAmount } = useSelector((state) => state.cart);

  return (
    <div className={style.cart}>
      {cartItems?.length === 0 ? (
        <>
          <div className={style.emptyCart}>
            <img src={emptyCart} alt="Empty Cart" />
          </div>

          <Link to={"/"}>
            Go Shopping Now
          </Link>
        </>
      ) : (
        <>
          <div className="table-responsive-lg w-100 container">
            <table className={`${style.tableContent} table align-middle`}>
              <thead>
                <tr>
                  <td className="text-center fw-medium">S.N</td>
                  <td className="text-center fw-medium">Product</td>
                  <td className="text-center fw-medium">Unit Price</td>
                  <td className="text-center fw-medium">Quantity</td>
                  <td className="text-center fw-medium">Total Price</td>
                  <td className="text-center fw-medium">Actions</td>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item, index) => (
                  <tr key={item.id} className={style.tr}>
                    <td className={`${style.td} text-center`}>{index + 1}</td>
                    <td className={`${style.td} text-center`}>{item?.title}</td>
                    <td className={`${style.td} text-center`}>
                      {item?.discountedPrice.toFixed(2)}
                    </td>
                    <td className={`${style.qty}`}>
                      <div
                        className={`${style.qtyChange} d-flex align-items-center justify-content-center`}
                      >
                        <button
                          className={`${style.qtyDecrease} d-flex align-items-center justify-content-center`}
                          onClick={() =>
                            dispatch(
                              toggleCartQty({ id: item?.id, type: "DEC" })
                            )
                          }
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <div
                          className={`${style.qtyValue} d-flex align-items-center justify-content-center`}
                        >
                          {item?.quantity}
                        </div>

                        <button
                          className={`${style.qtyIncrease} d-flex align-items-center justify-content-center`}
                          onClick={() =>
                            dispatch(
                              toggleCartQty({ id: item?.id, type: "INC" })
                            )
                          }
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className={`${style.price} text-center `}>
                      ${item?.totalPrice.toFixed(2)}
                    </td>
                    <td className={`${style.td} text-center`}>
                      <button
                        className={`${style.deleteBtn} bg-danger m-auto`}
                        onClick={() => dispatch(removeFromCart(item?.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-100">
            <div className="container">
              <div
                className={`${style.checkout} d-flex align-items-center justify-content-between p-4`}
              >
                <div className={style.clear}>
                  <button
                    className={`${style.clearCart}`}
                    onClick={() => dispatch(clearCart())}
                  >
                    <i className="fas fa-trash"></i>
                    <span className="btnText mx-2">Clear Cart</span>
                  </button>
                </div>

                <div className={style.totalPrice}>
                  <h5>
                    Total ({itemsCount}) Items:{" "}
                    <span>${totalAmount.toFixed(2)}</span>
                  </h5>

                  <button className={`${style.checkoutBtn}`}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
