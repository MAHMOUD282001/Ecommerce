import {configureStore} from "@reduxjs/toolkit"
import sidebarSlice from "./sidebarSlice"
import categorySlice from "./categorySlice"
import productsSlice from "./productsSlice"
import cartSlice from "./cartSlice"
import searchSlice from "./searchSlice"

const store = configureStore({
    reducer:{
        sidebar: sidebarSlice,
        category: categorySlice,
        product: productsSlice,
        cart: cartSlice,
        search: searchSlice,
    }
})

export default store