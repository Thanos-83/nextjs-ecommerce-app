import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartItemsSlice = createSlice({
  name: 'cart items',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload);
    },
  },
});

export const { addToCart } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
