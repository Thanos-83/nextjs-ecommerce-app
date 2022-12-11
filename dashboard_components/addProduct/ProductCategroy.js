import { Autocomplete, Checkbox, TextField } from '@mui/material';
import React from 'react';

function ProductCategroy({
  productData,
  setProductData,
  categoryOptionsList,
  defaultCategory,
}) {
  // console.log(defaultCategory._id);

  // console.log(
  //   categoryOptionsList.find((cat) => cat._id === defaultCategory._id)
  // );
  // console.log(categoryOptionsList);
  return (
    <div className='product_category addProduct_formWrapper'>
      <h1>Parent Category</h1>
      <Autocomplete
        // multiple
        disableCloseOnSelect
        id='category-select'
        placeholder='Choose a category'
        autoHighlight
        size='small'
        defaultValue={categoryOptionsList.find(
          (cat) => cat._id === defaultCategory._id
        )}
        options={categoryOptionsList || []}
        isOptionEqualToValue={(option, value) => option?.name === value?.name}
        getOptionLabel={(option) => option?.name}
        renderOption={(props, option, { selected, inputValue }) => {
          return (
            <li {...props} className='cursor-pointer' key={option._id}>
              <Checkbox checked={selected} sx={{ ml: 2 * option.depth }} />
              {option.name}
            </li>
          );
        }}
        onChange={(event, value) => {
          setProductData({ ...productData, category: value?._id });
          // console.log(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id='parent category'
            name='parent category'
            // label='Parent Category'
            size='small'
            placeholder='Choose parent category'
            // value={productData.category}
          />
        )}
      />
    </div>
  );
}

export default ProductCategroy;
