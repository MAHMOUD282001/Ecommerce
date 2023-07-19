import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncSingleProduct,
  getSingleProduct,
  getSingleProductStatus,
} from "../../store/productsSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import style from "./SinglePrpduct.module.css";
import { addToCart } from "../../store/cartSlice";
import { toast } from "react-toastify";

function SingleProduct() {
  let { id } = useParams();

  let dispatch = useDispatch();

  let product = useSelector(getSingleProduct);

  let singleProductStatus = useSelector(getSingleProductStatus);
  
  let [quantity, setQuantity] = useState(1)
  
  let [img, setImg] = useState(
    product ? (product.images ? product.images[0] : "") : ""
  );

  useEffect(() => {
    dispatch(fetchAsyncSingleProduct(id));
  }, []);
  
  useEffect(() => {
    setImg(product ? (product.images ? product.images[0] : "") : "");
    window.scrollTo(0, 0);
  }, [product]);
  
  
  
  let discountedPrice =
    product?.price - (product?.price * product?.discountPercentage) / 100;
  
  let increaseQty = ()=>{
    setQuantity((prevQty) =>{
      let newQty = prevQty + 1
      
      if(newQty > product?.stock) newQty = product?.stock
      return newQty
    })
  }
  
  let decreaseQty = ()=>{
    setQuantity((prevQty) =>{
      let newQty = prevQty - 1
      
      if(newQty < 1) newQty = 1
      return newQty
    })
  }
  
  let handleAddTpCart = ()=>{
    let totalPrice = discountedPrice * quantity
    
    dispatch(addToCart({...product, quantity, totalPrice, discountedPrice}))
    
    toast.success("Product Added Successfully")
  }
  
  return (
    <main className={`${style.product} py-5`}>
      {singleProductStatus === STATUS.LOADING ? (
        <Loader />
      ) : (
        <div className={style.singleProduct}>
          <div className="container">
            <div className={`${style.productContent} row w-100 m-auto`}>
              <div className={`${style.productImg} col-lg-6`}>
                <div className={`${style.productImgZoom}`}>
                  <img src={img} />
                </div>

                <div
                  className={`${style.productImgThumbs} d-flex align-items-center justify-content-center flex-wrap gap-3 pt-4`}
                >
                  <div
                    className={`${style.productImgThumb}`}
                    onClick={() =>
                      setImg(
                        product ? (product.images ? product.images[0] : "") : ""
                      )
                    }
                  >
                    <img
                      src={
                        product ? (product.images ? product.images[0] : "") : ""
                      }
                    />
                  </div>

                  {product ? (
                    product.images ? (
                      product.images[1] ? (
                        <div
                          className={`${style.productImgThumb}`}
                          onClick={() =>
                            setImg(
                              product
                                ? product.images
                                  ? product.images[1]
                                  : ""
                                : ""
                            )
                          }
                        >
                          <img
                            src={
                              product
                                ? product.images
                                  ? product.images[1]
                                  : ""
                                : ""
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}

                  {product ? (
                    product.images ? (
                      product.images[2] ? (
                        <div
                          className={`${style.productImgThumb}`}
                          onClick={() =>
                            setImg(
                              product
                                ? product.images
                                  ? product.images[2]
                                  : ""
                                : ""
                            )
                          }
                        >
                          <img
                            src={
                              product
                                ? product.images
                                  ? product.images[2]
                                  : ""
                                : ""
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className={`${style.productdetails} col-lg-6 my-4 ps-md-4`}>
                <div className={`${style.title}`}>{product?.title}</div>

                <div className={`${style.description} mt-4`}>
                  {product?.description}
                </div>

                <div
                  className={`${style.info} d-flex align-items-center flex-wrap mt-3`}
                >
                  <div className={`${style.rating}`}>
                    <span>Rating: </span>
                    <span className="mx-1">{product?.rating}</span>
                  </div>

                  <div className={style.vertLine}></div>

                  <div className={`${style.brand}`}>
                    <span>Brand: </span>
                    <span className="mx-1">{product?.brand}</span>
                  </div>

                  <div className={style.vertLine}></div>

                  <div className={`${style.category}`}>
                    <span>Category: </span>
                    <span className="mx-1">
                      {product?.category
                        ? product.category.replace("-", " ")
                        : ""}
                    </span>
                  </div>
                </div>

                <div className={`${style.price} mt-5`}>
                  <div className="d-flex align-items-center gap-2">
                    <div className={`${style.oldPrice}`}>${product?.price}</div>
                    <span>(Inclusive All Taxis)</span>
                  </div>

                  <div className="d-flex align-items-center gap-2 my-2">
                    <div className={`${style.newPrice}`}>
                      ${discountedPrice.toFixed(2)}
                    </div>
                    <span className={`${style.discount}`}>
                      {product?.discountPercentage?.toFixed(2)}% OFF
                    </span>
                  </div>
                </div>

                <div className={`${style.qty} d-flex align-items-center my-5`}>
                  <div className={`${style.qtyText}`}>Quantity:</div>

                  <div
                    className={`${style.qtyChange} d-flex align-items-center mx-3`}
                  >
                    <button
                      className={`${style.qtyDecrease} d-flex align-items-center justify-content-center`}
                      onClick={decreaseQty}
                    >
                      <i className="fas fa-minus"></i>
                    </button>

                    <div
                      className={`${style.qtyValue} d-flex align-items-center justify-content-center`}
                    >
                      {quantity}
                    </div>

                    <button
                      className={`${style.qtyIncrease} d-flex align-items-center justify-content-center`}
                      onClick={increaseQty}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>

                  {product?.stock === 0 ? (
                    <div
                      className={`${style.qtyErr} text-uppercase bg-danger text-white mx-2`}
                    >
                      Out Of Stock
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="btns d-flex gap-3">
                  <button className={`${style.addToCart}`}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="btnText mx-2" onClick={handleAddTpCart}>Add To Cart</span>
                  </button>

                  <button className={`${style.buyNow}`}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default SingleProduct;
