import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncProductsOfCategory,
  getAllProductsByCategory,
  getCategoryProductsStatus,
} from "../../store/categorySlice";
import Loader from "../../components/Loader/Loader";
import ProductsList from "../../components/ProductsList/ProductsList";
import { STATUS } from "../../utils/status";
import style from "./CategoryProduct.module.css";

function CategoryProduct() {
  let { category } = useParams();

  let dispatch = useDispatch();

  let categoryProducts = useSelector(getAllProductsByCategory);

  let categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);

  console.log(categoryProducts);

  return (
    <div className={`${style.categoryProducts} py-5`}>
      <div className="container">
        <div className={`${style.categoriesItem} py-4 ps-0 ps-md-5`}>
          <h3 className="mb-0">{category}</h3>
        </div>

        {categoryProductsStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductsList products={categoryProducts} />
        )}
      </div>
    </div>
  );
}

export default CategoryProduct;
