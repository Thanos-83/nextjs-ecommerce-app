import { Autocomplete, Checkbox, TextField } from '@mui/material';
import React from 'react';

function ProductTags({ productData, setProductData }) {
  return (
    <div className='product_tags addProduct_formWrapper'>
      <h1>Product Tags</h1>
      <Autocomplete
        multiple
        disableCloseOnSelect
        id='tags-select'
        placeholder='Add Product Tags'
        autoHighlight
        size='small'
        // key={name}
        options={[]}
        isOptionEqualToValue={
          (option, value) => option?.name === value?.name
          // console.log(option)
        }
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
            value={productData.category}
          />
        )}
      />
    </div>
  );
}

export default ProductTags;
