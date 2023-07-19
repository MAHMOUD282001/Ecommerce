import React from "react";
import { Link } from "react-router-dom";
import style from "./Product.module.css"

function Product({ product }) {  
  
  return <Link to={`/product/${product?.id}`} key={product?.id} className="col-xl-3 col-lg-4 col-md-6 rounded mb-4">
    <div className={`${style.productItem} bg-white`}>
      <div className={`${style.category}`}>{product?.category}</div>
      <span className={style.categoryArrow}></span>
      
      <div className={`${style.productImg}`}>
        <img src={product?.images[0]} alt={product?.title}/>
      </div>
      
      <div className={`${style.productItemInfo} pt-3`}>
        <div className={`${style.brand}`}>
          <span>Brand: </span>
          <span>{product?.brand}</span>
        </div>
        
        <div className={`${style.title} py-3 text-center`}>
          {product?.title}
        </div>
        
        <div className={`${style.price} d-flex align-items-center justify-content-center gap-4`}>
          <span className={`${style.oldPrice}`}>
            ${product?.price.toFixed(2)}
          </span>
          
          <span className={`${style.newPrice}`}>
            ${product?.discountedPrice.toFixed(2)}
          </span>
          
          <span className={`${style.discount}`}>
            ({product?.discountPercentage}% Off)
          </span>
        </div>
      </div>
      <span className={style.last}></span>
    </div>
  </Link>;
}

export default Product;
