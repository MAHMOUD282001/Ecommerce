import React from "react";
import style from "./ProductsList.module.css";
import Product from "../Product/Product";

function ProductsList({ products }) {

  return (
    <div className={`${style.products} my-5 row`}>
      {products.map((product) => {
        let discountedPrice =
          product.price - product.price * (product.discountPercentage / 100);
        
        return (
          <Product key={product.id} product={{ ...product, discountedPrice }} />
        );
      })}
    </div>
  );
}

export default ProductsList;
