import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  productData: {},
};

export const productDataSlice = createSlice({
  name: 'product data',
  initialState,
  reducers: {
    initializeProductData: (state, action) => {
      // console.log(action.payload);
      state.productData = {
        name: action.payload.name,
        featuredImage: action.payload.featuredImage,
        description: action.payload.description,
        shortDescription: action.payload.shortDescription,
        sku: action.payload.sku,
        brand: action.payload.brand,
        price: action.payload.price.toFixed(2),
        category: action.payload.category,
        user: action.payload.user,
        attributes: action.payload.attributes,
        isFeatured: action.payload.isFeatured,
      };
    },

    updateProductData: (state, action) => {
      console.log(action.payload);
    },
    removeAttribute: (state, action) => {
      // alert('payload: ', action);
      console.log(action.payload);
      console.log(state.productData.attributes);
      const updatedAttributes = state.productData.attributes.filter(
        (attribute) => attribute._id !== action.payload
      );
      console.log(updatedAttributes);
      // state.productData.attributes = updatedAttributes;
      state.productData = {
        ...state.productData,
        attributes: updatedAttributes,
      };
      console.log(current(state));
    },
    updateProductAttribute: (state, action) => {
      console.log(action.payload);
      state.productData.attributes = [
        ...state.productData.attributes,
        action.payload,
      ];
    },
    updateAttributeTerms: (state, action) => {
      console.log(action.payload);
      state.productData.attributes = [
        ...state.productData.attributes,
        action.payload,
      ];
    },
    updateName: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        name: action.payload,
      };
    },
    updateBrand: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        brand: action.payload,
      };
    },
    updateCategory: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        category: action.payload,
      };
    },
    updateDescription: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        description: action.payload,
      };
    },
    updateShortDescription: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        shortDescription: action.payload,
      };
    },
    updateFeaturedImage: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        featuredImage: action.payload,
      };
    },
    deleteFeaturedImage: (state) => {
      state.productData = {
        ...state.productData,
        featuredImage: '',
      };
    },
    updateIsFeatured: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        isFeatured: action.payload,
      };
    },
  },
});

export const {
  updateProductData,
  initializeProductData,
  removeAttribute,
  updateProductAttribute,
  updateName,
  updateBrand,
  updateCategory,
  updateFeaturedImage,
  deleteFeaturedImage,
  updateDescription,
  updateShortDescription,
  updateIsFeatured,
} = productDataSlice.actions;

export default productDataSlice.reducer;
