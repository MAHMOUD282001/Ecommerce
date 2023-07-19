import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { BASE_URL } from "../utils/ApiUrl";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  singleProduct: [],
  singleProductStatus: STATUS.IDLE,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncProducts.pending, (state) => {
      state.productsStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productsStatus = STATUS.SUCCEEDED;
    });
    builder.addCase(fetchAsyncProducts.rejected, (state) => {
      state.productsStatus = STATUS.FAILED;
    });
    
    
    
    builder.addCase(fetchAsyncSingleProduct.pending, (state) => {
      state.singleProductStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.singleProductStatus = STATUS.SUCCEEDED;
    });
    builder.addCase(fetchAsyncSingleProduct.rejected, (state) => {
      state.singleProductStatus = STATUS.FAILED;
    });
  },
});

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async (limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);

    const data = await response.json();

    return data.products;
  }
);

export const fetchAsyncSingleProduct = createAsyncThunk(
  "product/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);

    const data = await response.json();

    return data;
  }
);

export const getAllProducts = (state)=> state.product.products

export const getAllProductsStatus = (state)=> state.product.productsStatus

export const getSingleProduct = (state)=> state.product.singleProduct

export const getSingleProductStatus = (state)=> state.product.singleProductStatus


export default productsSlice.reducer;
