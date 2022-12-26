import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attributes: [],
};

export const productAttributesSlice = createSlice({
  name: 'productAttributes',
  initialState,
  reducers: {
    addAttribute: (state, action) => {
      console.log(state.attributes);
      console.log(action);
      state.attributes = [...state.attributes, action.payload];
    },
    initializeAttribute: (state, action) => {
      state.attributes = action.payload;
    },
    removeAttribute: (state, action) => {
      console.log(action.payload);
      // console.log(state);
      const newAttributes = state.attributes.filter(
        (attribute) => attribute._id !== action.payload
      );
      state.attributes = newAttributes;
    },
    resetAttributes: (state) => {
      state.attributes = [];
    },
  },
});

export const {
  addAttribute,
  removeAttribute,
  resetAttributes,
  initializeAttribute,
} = productAttributesSlice.actions;

export default productAttributesSlice.reducer;
