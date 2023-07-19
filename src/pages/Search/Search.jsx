import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearSearch,
  fetchAsyncSearchProduct,
  getSearchProducts,
  getSearchProductsStatus,
} from "../../store/searchSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import ProductsList from "../../components/ProductsList/ProductsList";
import style from "./Search.module.css";
import productNotFound from "../../assets/Product Not Found.jpg";

function Search() {
  let { searchTerm } = useParams();

  let dispatch = useDispatch();

  let searchProducts = useSelector(getSearchProducts);

  let searchProductsStatus = useSelector(getSearchProductsStatus);

  useEffect(() => {
    dispatch(clearSearch())
    dispatch(fetchAsyncSearchProduct(searchTerm));
  }, [searchTerm]);

  return (
    <div>
      {searchProducts.length === 0 ? (
        <div className={style.notFoundProduct}>
          <div className="container d-flex flex-column align-items-center justify-content-center">
            <img src={productNotFound} alt="Product Not Found" />

            <Link to={"/"}>Go Shopping Now</Link>
          </div>
        </div>
      ) : (
        <div className={`${style.categoryProducts} py-5`}>
          <div className="container">
            <div className={`${style.categoriesItem} py-4 ps-0 ps-md-5`}>
              <h3 className="mb-0">{searchTerm}</h3>
            </div>

            {searchProductsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductsList products={searchProducts} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
