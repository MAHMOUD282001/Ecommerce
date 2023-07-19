import { createSlice } from "@reduxjs/toolkit";

let fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

let storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  cartItems: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let isItemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInCart) {
        let newCart = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalPrice = item.price * newQty;

            return { ...item, quantity: newQty, totalPrice: newTotalPrice };
          } else {
            return item;
          }
        });

        state.cartItems = newCart;

        storeInLocalStorage(state.cartItems);
      } else {
        state.cartItems.push(action.payload);
        storeInLocalStorage(state.cartItems);
      }
    },

    removeFromCart: (state, action) => {
      let newCart = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = newCart;
      storeInLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      storeInLocalStorage(state.cartItems);
    },

    getCartTotal: (state) => {
      state.totalAmount = state.cartItems.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);

      state.itemsCount = state.cartItems.length;
    },

    toggleCartQty: (state, action) => {
      let newCart = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          let totalQty = item.quantity;
          let totalPrice = item.totalPrice;

          if (action.payload.type === "INC") {
            totalQty++;
            if (totalQty === item.stock) {
              totalQty = item.stock;
            }

            totalPrice = totalQty * item.discountedPrice;
          }

          if (action.payload.type === "DEC") {
            totalQty--;
            if (totalQty < 1) {
              totalQty = 1;
            }

            totalPrice = totalQty * item.discountedPrice;
          }

          return { ...item, quantity: totalQty, totalPrice };
        } else {
          return item;
        }
      });

      state.cartItems = newCart;
      storeInLocalStorage(state.cartItems);
    },
  },
});

export const { addToCart, getCartTotal, toggleCartQty, removeFromCart, clearCart } = cartSlice.actions;

export const getAllCartItems = (state) => state.cart.cartItems;

export const getCartItemsCount = (state) => state.cart.itemsCount;

export default cartSlice.reducer;
