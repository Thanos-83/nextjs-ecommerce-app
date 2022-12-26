import { configureStore } from '@reduxjs/toolkit';
import productAttributesReducer from '../features/productAttributes/productAttributesSlice';
import productDataReducer from '../features/productData/productDataSlice';

export const store = configureStore({
  reducer: {
    productAttributes: productAttributesReducer,
    productData: productDataReducer,
  },
});
