import React, { useEffect, useState } from "react";
import HomeSlider from "../../components/Slider/HomeSlider";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../store/productsSlice";
import { STATUS } from "../../utils/status";
import ProductsList from "../../components/ProductsList/ProductsList";
import Loader from "../../components/Loader/Loader";

function Home() {
  
  let dispatch = useDispatch();

  let categories = useSelector(getAllCategories);

  let products = useSelector(getAllProducts);

  let productsStatus = useSelector(getAllProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, []);
  

  let catProductsOne = products.filter(
    (product) => product.category === categories[0].slug
  );

  let catProductsTwo = products.filter(
    (product) => product.category === categories[1].slug
  );

  let catProductsThree = products.filter(
    (product) => product.category === categories[2].slug
  );

  let catProductsFour = products.filter(
    (product) => product.category === categories[3].slug
  );
  
  console.log(categories)
  
  return (
    <main>
      <div className="sliderWrapper">
        <HomeSlider />
      </div>

      <div className="mainContent">
        <div className="container">
          <div className="categories py-5 text-md-start text-center">

            <div className={`${style.categoriesItem} py-4 ps-0 ps-md-5`}>
              <h3 className="mb-0">{categories[0]?.name}</h3>
            </div>

            {productsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductsList products={catProductsOne} />
            )}
            
            <div className={`${style.categoriesItem} py-4 ps-0 ps-md-5`}>
              <h3 className="mb-0">{categories[1]?.name}</h3>
            </div>

            {productsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductsList products={catProductsTwo} />
            )}
            
            <div className={`${style.categoriesItem} py-4 ps-0 ps-md-5`}>
              <h3 className="mb-0">{categories[2]?.name}</h3>
            </div>

            {productsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductsList products={catProductsThree} />
            )}
            
            <div className={`${style.categoriesItem} py-4 ps-0 ps-md-5`}>
              <h3 className="mb-0">{categories[3]?.name}</h3>
            </div>

            {productsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductsList products={catProductsFour} />
            )}
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
