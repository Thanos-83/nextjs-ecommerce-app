import { configureStore } from '@reduxjs/toolkit';
import productAttributesReducer from '../features/productAttributes/productAttributesSlice';
import productDataReducer from '../features/productData/productDataSlice';
import cartItemsReducer from '../features/basketItems/cartItemsSlice';

export const store = configureStore({
  reducer: {
    productAttributes: productAttributesReducer,
    productData: productDataReducer,
    cartItems: cartItemsReducer,
  },
});
