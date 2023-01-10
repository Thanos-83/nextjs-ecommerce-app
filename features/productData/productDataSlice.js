import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  productData: {
    name: '',
    slug: '',
    featuredImage: '',
    type: '',
    imageGallery: Array.apply('', Array(6)),
    description: '',
    shortDescription: '',
    sku: '',
    brand: '',
    price: 0,
    category: '',
    user: '',
    attributes: [],
    isFeatured: false,
  },
};

export const productDataSlice = createSlice({
  name: 'product data',
  initialState,
  reducers: {
    initializeProductData: (state, action) => {
      console.log('Product slice: ', action.payload);
      if (action.payload) {
        state.productData = {
          ...state.productData,
          name: action.payload.name,
          type: action.payload.type,
          featuredImage: action.payload.featuredImage,
          imageGallery: action.payload.imageGallery,
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
      } else {
        state.productData = {
          ...state.productData,
          name: '',
          type: '',
          featuredImage: '',
          imageGallery: Array.apply('', Array(6)),
          description: '',
          shortDescription: '',
          sku: '',
          brand: '',
          price: 0,
          category: '',
          user: '',
          attributes: [],
          isFeatured: false,
        };
      }
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
    resetAttributes: (state) => {
      state.productData.attributes = [];
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
    updateProductType: (state, action) => {
      console.log(action.payload);
      state.productData = {
        ...state.productData,
        type: action.payload,
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
    updateImageGallery: (state, action) => {
      console.log(action.payload);
      state.productData.imageGallery[action.payload.index - 1] =
        action.payload.src;
    },
    updatePrice: (state, action) => {
      state.productData = {
        ...state.productData,
        price: action.payload,
      };
    },
    updateSku: (state, action) => {
      state.productData = {
        ...state.productData,
        sku: action.payload,
      };
    },
  },
});

export const {
  updateProductData,
  initializeProductData,
  removeAttribute,
  updateProductAttribute,
  resetAttributes,
  updateName,
  updateProductType,
  updateBrand,
  updateCategory,
  updateFeaturedImage,
  updateImageGallery,
  deleteFeaturedImage,
  updateDescription,
  updateShortDescription,
  updateIsFeatured,
  updatePrice,
  updateSku,
} = productDataSlice.actions;

export default productDataSlice.reducer;
