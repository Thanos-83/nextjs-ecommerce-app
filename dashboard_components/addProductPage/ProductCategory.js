import React, { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { nestedCategories } from '../../utils/flattenCategoriesList';
import { listCategories } from '../../utils/listCategories';
import axios from 'axios';
function ProductCategory({ productData, setProductData }) {
  const [optionsList, setOptionsList] = useState([]);
  // console.log('options list: ', optionsList);
  useEffect(() => {
    axios
      .get('/api/dashboard/categories')
      .then((res) => {
        // console.log('Use effect categories: ', res);
        const flattenList = nestedCategories(res.data);
        // console.log('flatten List: ', flattenList);
        const list = listCategories(flattenList);
        // console.log('List: ', list);
        setOptionsList(list);
        // setCategories(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect;
  return (
    <div className='product_category addProduct_formWrapper'>
      <h1>Parent Category</h1>
      <Autocomplete
        disableCloseOnSelect
        id='category-select'
        placeholder='Choose a category'
        autoHighlight
        size='small'
        options={optionsList || []}
        isOptionEqualToValue={(option, value) => option?.name === value?.name}
        getOptionLabel={(option) => option.name}
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
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id='parent category'
            name='parent category'
            size='small'
            placeholder='Choose parent category'
          />
        )}
      />
    </div>
  );
}

export default ProductCategory;
