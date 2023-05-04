import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  cartItems: [],
  user: null,
  sidebarCartStatus: false,
};

export const cartItemsSlice = createSlice({
  name: 'cart items',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addToCart: (state, action) => {
      // state.cartItems = [...state.cartItems, 'test'];
      // console.log(action.payload);
      // const item = await axios.post('/api/cart', {
      //   cartItem: {
      //     title: action.payload.title,
      //     price: action.payload.price,
      //     image: action.payload.image,
      //     quantity: action.payload.quantity,
      //   },
      //   customer: action.payload.customer,
      // });
      // console.log(item);
      // const guest = Cookies.get('gest-user');
      // const authUser = Cookies.get('next-auth.session-token');
      // console.log('gest cookie client: ', guest);
      alert(action.payload.productType);
      if (action.payload.productType === 'Variable') {
        const variableCartItem = state.cartItems.find(
          (item) => item.productID === action.payload.productID
        );

        if (variableCartItem) {
          variableCartItem.quantity = action.payload.quantity;
        } else {
          state.cartItems = [...state.cartItems, action.payload];
        }
      } else {
        const simpleCartItem = state.cartItems.find(
          (item) => item.productID === action.payload.productID
        );
        if (simpleCartItem) {
          simpleCartItem.quantity += action.payload.quantity;
        } else {
          state.cartItems = [...state.cartItems, action.payload];
        }
      }
    },
    deleteItemFromCart: (state, action) => {
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item.productID !== action.payload
      );
    },
    toggleCartSidebar: (state) => {
      state.sidebarCartStatus = !state.sidebarCartStatus;
      // console.log('toggleCartSidebar status: ', state);
    },
  },
});

export const { addUser, addToCart, deleteItemFromCart, toggleCartSidebar } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
